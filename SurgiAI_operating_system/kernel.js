const { Keyboard, Mouse } = require('./devices');
const { SystemInformation, SystemUtilities } = require('./system');
const { FileSystem } = require('./file-system');

class Kernel {
  constructor() {
    this.keyboard = new Keyboard();
    this.mouse = new Mouse();
    this.systemInformation = new SystemInformation();
    this.systemUtilities = new SystemUtilities();
    this.fileSystem = new FileSystem();
  }

  boot() {
    console.log('Booting kernel...');

    this.keyboard.on('keydown', (event) => {
      console.log(`Keyboard event: ${JSON.stringify(event)}`);
    });

    this.mouse.on('mousemove', (event) => {
      console.log(`Mouse event: ${JSON.stringify(event)}`);
    });

    this.mouse.on('mousedown', (event) => {
      console.log(`Mouse event: ${JSON.stringify(event)}`);
    });

    const keyboardEvents = [{ type: 'keydown', key: 'a' }];
    const mouseEvents = [
      { type: 'mousemove', x: 10, y: 20 },
      { type: 'mousedown', button: 'left', x: 10, y: 20 },
    ];

    console.log(`Keyboard events: ${JSON.stringify(keyboardEvents)}`);
    console.log(`Mouse events: ${JSON.stringify(mouseEvents)}`);

    const fileSize = 1234567890;
    const formattedSize = this.systemUtilities.formatSize(fileSize);
    console.log(`Formatted size: ${formattedSize}`);

    const timestamp = Date.now();
    const formattedDate = this.systemUtilities.formatDate(timestamp);
    console.log(`Formatted date: ${formattedDate}`);

    const fileName = 'test-file.txt';
    const fileContent = 'Hello, world!';
    const filePath = `/tmp/${fileName}`;
    this.fileSystem.writeFile(filePath, fileContent);

    const dirPath = '/tmp';
    const dirContents = this.fileSystem.readDir(dirPath);
    console.log(`Directory contents: ${JSON.stringify(dirContents)}`);

    const testFilePath = `${dirPath}/${fileName}`;
    const fileContents = this.fileSystem.readFile(testFilePath);
    console.log(`File content: ${fileContents}`);

    const parentDir = this.fileSystem.getParentDir(testFilePath);
    console.log(`Parent directory: ${parentDir}`);

    const pathComponents = this.fileSystem.getPathComponents(testFilePath);
    console.log(`Path components: ${JSON.stringify(pathComponents)}`);

    const dirPathNotExist = '/tmp/test-dir';
    const dirExists = this.fileSystem.exists(dirPathNotExist);
    const isDirectory = this.fileSystem.isDirectory(dirPathNotExist);
    console.log(`Directory exists: ${dirExists}, is directory: ${isDirectory}`);

    const filePathNotExist = '/tmp/test-file-not-exist.txt';
    const fileExists = this.fileSystem.exists(filePathNotExist);
    const isDirectoryFile = this.fileSystem.isDirectory(filePathNotExist);
    console.log(`File exists: ${fileExists}, is directory: ${isDirectoryFile}`);

    console.log(`Node.js ${process.version}`);
  }
}

const kernel = new Kernel();
kernel.boot();
