#include <iostream>
#include <string>
#include <vector>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <queue>

struct Connection {
    std::string sourceIP;
    std::string destinationIP;
    int sourcePort;
    int destinationPort;

    bool match(const Connection& other) const {
        return sourceIP == other.sourceIP &&
               destinationIP == other.destinationIP &&
               sourcePort == other.sourcePort &&
               destinationPort == other.destinationPort;
    }
};

class Firewall {
public:
    Firewall(const std::string& filename);
    bool isAllowed(Connection connection);
    void startWorkers(int numWorkers);
    void addConnection(Connection connection);
    void waitUntilDone();
    std::vector<bool> getResults();

private:
    void addRule(std::string sourceIP, std::string destinationIP,
                 int sourcePort, int destinationPort);

    std::vector<Connection> rules_;
    std::deque<std::vector<Connection>> rulesDeque_;
    std::deque<Connection> queue_;
    std::vector<std::thread> workers_;
    std::vector<bool> results_;
    std::mutex mutex_;
    std::condition_variable cv_;
    bool isDone_ = false;
};

Firewall::Firewall(const std::string& filename) {
    // Parse rules from file and add them to the rules vector
}

void Firewall::addRule(std::string sourceIP, std::string destinationIP,
                       int sourcePort, int destinationPort) {
    Connection rule = {sourceIP, destinationIP, sourcePort, destinationPort};
    std::lock_guard<std::mutex> guard(mutex_);
    rulesDeque_.push_back({rule});
}

bool Firewall::isAllowed(Connection connection) {
    for (const auto& rules : rulesDeque_) {
        for (const auto& rule : rules) {
            if (rule.match(connection)) {
                return true;
            }
        }
    }
    return false;
}

void Firewall::startWorkers(int numWorkers) {
    for (int i = 0; i < numWorkers; ++i) {
        workers_.emplace_back([this] {
            std::vector<Connection> rules;
            while (true) {
                {
                    std::unique_lock<std::mutex> lock(mutex_);
                    cv_.wait(lock, [this] { return !rulesDeque_.empty() || isDone_; });

                    if (rulesDeque_.empty()) {
                        if (isDone_) {
                            return;
                        }
                        continue;
                    }

                    rules = std::move(rulesDeque_.front());
                    rulesDeque_.pop_front();
                }

                for (const auto& conn : queue_) {
                    bool allowed = isAllowed(conn);
                    {
                        std::lock_guard<std::mutex> guard(mutex_);
                        results_.push_back(allowed);
                    }
                }
            }
        });
    }
}

void Firewall::addConnection(Connection connection) {
    std::lock_guard<std::mutex> guard(mutex_);
    queue_.push_back(connection);
    cv_.notify_one();
}

void Firewall::waitUntilDone() {
    {
        std::lock_guard<std::mutex> guard(mutex_);
        isDone_ = true;
    }
    cv_.notify_all();

    for (auto& worker : workers_) {
        worker.join();
    }
}

std::vector<bool> Firewall::getResults() {
    std::lock_guard<std::mutex> guard(mutex_);
    return std::move(results_);
}
