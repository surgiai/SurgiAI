#include <iostream>
#include <string>
#include <vector>
#include <cstring>
#include <dirent.h>
#include <unistd.h>
#include <sys/wait.h>

using namespace std;

// Returns a vector of strings, each containing a token from the input string
vector<string> tokenizeInput(string input) {
    vector<string> tokens;
    char* token = strtok(&input[0], " ");
    while (token != NULL) {
        tokens.push_back(token);
        token = strtok(NULL, " ");
    }
    return tokens;
}

// Changes the current working directory to the specified directory
void changeDirectory(string directory) {
    if (chdir(&directory[0]) != 0) {
        cout << "Directory not found" << endl;
    }
}

// Lists the files and directories in the current working directory
void listDirectory() {
    DIR* dir = opendir(".");
    struct dirent* ent;
    while ((ent = readdir(dir)) != NULL) {
        cout << ent->d_name << endl;
    }
    closedir(dir);
}

// Executes a program with the specified arguments
void executeProgram(vector<string> args) {
    char* argv[args.size() + 1];
    for (int i = 0; i < args.size(); i++) {
        argv[i] = &args[i][0];
    }
    argv[args.size()] = NULL;
    pid_t pid = fork();
    if (pid == 0) {
        execvp(argv[0], argv);
        cout << "Command not found" << endl;
        exit(1);
    } else {
        wait(NULL);
    }
}

int main() {
    string input;
    while (true) {
        // Print the prompt and read input from the user
        cout << "> ";
        getline(cin, input);

        // Tokenize the input string
        vector<string> tokens = tokenizeInput(input);

        // Handle commands
        if (tokens.size() > 0) {
            string command = tokens[0];
            if (command == "cd") {
                if (tokens.size() > 1) {
                    changeDirectory(tokens[1]);
                } else {
                    cout << "Usage: cd directory" << endl;
                }
            } else if (command == "ls") {
                listDirectory();
            } else {
                executeProgram(tokens);
            }
        }
    }
    return 0;
}