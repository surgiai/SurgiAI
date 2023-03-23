// file-system.js

const fs = require('fs');
const path = require('path');

class FileSystem {
  constructor() {
    this.rootPath = '/';
  }

  exists(path) {
    return fs.existsSync(path);
  }

  isDirectory(path) {
    return fs.statSync(path).isDirectory();
  }

  readDirectory(path) {
    return fs.readdirSync(path);
  }

  readFile(path) {
    return fs.readFileSync(path, 'utf8');
  }

  writeFile(path, data) {
    return fs.writeFileSync(path, data);
  }

  deleteFile(path) {
    return fs.unlinkSync(path);
  }

  getSize(path) {
    return fs.statSync(path).size;
  }

  getLastModified(path) {
    return fs.statSync(path).mtime;
  }

  getParentDirectory(path) {
    const parentPath = path === this.rootPath ? this.rootPath : path.split('/').slice(0, -1).join('/');
    return { path: parentPath, name: path.split('/').slice(-1)[0] };
  }

  getPathComponents(path) {
    const components = path.split('/');
    return components.slice(1).map((component, index) => {
      const parentPath = `/${components.slice(1, index + 1).join('/')}`;
      return { name: component, path: parentPath };
    });
  }

  createDirectory(path) {
    return fs.mkdirSync(path);
  }

  deleteDirectory(path) {
    return fs.rmdirSync(path);
  }
}

module.exports = FileSystem;
