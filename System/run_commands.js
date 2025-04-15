const command = document.querySelector(".command");
const prompt = document.querySelector("#prompt");
const terminal = document.querySelector(".terminal");
let oldDirectory = "/";
let currentDirectory = "/";
let temp = command.value;
let commandValue = temp.toLowerCase();
let commands = [];
let commandsReverse = [];
let currentStyle = ["#1E1E1E", "#1E1E1E", "#1E1E1E", "#1E1E1E"];

if (window.sessionStorage.getItem("time") == null) {
  window.sessionStorage.setItem("time", performance.now());
}

theme_command("1");
themeChange();

commands = window.sessionStorage.getItem("commands")
  ? JSON.parse(window.sessionStorage.getItem("commands"))
  : [];
commandsReverse = reverse(commands);

function reverse(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i > -1; i--) 
    reversed.push(arr[i]);
  return reversed;
}

function updata_commands() {
  if (command.value === "" || command.value === commands[commands.length - 1]) return;
  commands.push(command.value);
  commandsReverse = reverse(commands);
  window.sessionStorage.setItem("commands", JSON.stringify(commands));
}

function themeChange() {
  command.style.color = currentStyle[0];
  prompt.style.color = currentStyle[0];
  terminal.style.color = currentStyle[0];
  terminal.style.backgroundColor = currentStyle[2];
  document.body.style.backgroundColor = currentStyle[1];
  window.mediaRunner.currentStyle2[0] = currentStyle[0];
  window.mediaRunner.currentStyle2[1] = currentStyle[2];
}

function make_output() {
  let out = document.createElement("p");
  out.style = `
  padding: 0px;
  margin: 0px;
  margin-left: 15px;
  font-size: 16px;
  font-family: monospace;
  color: ${currentStyle[3]};
  display: block;
  margin-left: 25px;`;
  return out;
}

function updata_command() {
  temp = command.value;
  commandValue = temp.toLowerCase();
}

function addLastCommand() {
  let commandValue = command.value;
  let lastCommand = document.createElement("p");
  temp = document.createElement("p");
  lastCommand.style = `
  display: inline-block;
  margin: 15px;
  font-size: 16px;
  width: 98%;
  font-family: monospace;
  user-select: none;
  align-items: center;
  color: ${currentStyle[0]};`;
  lastCommand.textContent = ` ${commandValue}`;
  temp.style = `
  color: ${currentStyle[0]};
  display: inline-block;
  padding: 10px;
  padding-left: 0px;
  padding-right: 1px;
  margin: 0px;
  font-size: 16px;
  font-family: monospace;
  user-select: none;`;
  temp.textContent = `${oldDirectory}>`;
  lastCommand.prepend(temp);
  terminal.append(lastCommand);
}

function reset_command() {
  terminal.removeChild(prompt);
  terminal.append(prompt);
  command.value = "";
  prompt.removeChild(command);
  prompt.querySelector("#currentDirectory").textContent = `${currentDirectory}>`;
  prompt.append(command);
  command.focus();
  oldDirectory = currentDirectory;
}

function clear_terminal() {
  terminal.innerHTML = "";
  terminal.append(prompt);
  command.focus();
  command.value = "";
}

function help_command() {
  let out = make_output();
  out.innerHTML =
    "Available commands:\
  <br />clear / cls : to clear the terminal \
  <br />exit / quit : to close the terminal \
  <br />help : to show this message\
  <br />color : to change the color of the terminal\
  <br />colorbg : to change the color of the background\
  <br />ls / dir : to show the current directory\
  <br />cd [directory] : to change the current directory\
  <br />mkdir [directory] : to create a new directory\
  <br />rmdir [directory] : to remove a directory\
  <br />rm [file] : to remove a file\
  <br />cat [file] : to show the content of a file\
  <br />mkfile [file] : to create a new file\
  <br />touch [file] [content] : to create/write a file\
  <br />ipconfig / ifconfig : to show the ip address of the computer\
  <br />time : to show the current time\
  <br />date : to show the current date\
  <br />theme [number] : to change the theme of the terminal\
  <br />rename [file] [new name] : to rename a file\
  <br />calc [expression] : to calculate an expression\
  <br />echo [message] : to show a message\
  <br />uptime : to show the uptime of the computer\
  <br />version : to show the version of the terminal\
  <br />reverse [text] : to reverse a text\
  <br />length [text] : to show the length of a text\
  <br />repeat [times] [text] : to repeat a text\
  <br />base64 [text] : to show the base64 code of a text\
  <br />decode [text] : to decode a base64 text";
  return out;
}

function change_color(color) {
  if (color === "0") {
    currentStyle[0] = "#00FF00";
  } else if (color === "1") {
    currentStyle[0] = "#00FF00";
  } else if (color === "2") {
    currentStyle[0] = "#000000";
  } else if (color === "3") {
    currentStyle[0] = "#0000FF";
  } else if (color === "4") {
    currentStyle[0] = "#FFFF00";
  } else if (color === "5") {
    currentStyle[0] = "#FF00FF";
  } else if (color === "6") {
    currentStyle[0] = "#00FFFF";
  } else if (color === "7") {
    currentStyle[0] = "#FFFFFF";
  }
}

function change_colorbg(color) {
  if (color === "0") {
    currentStyle[1] = "#1E1E1E";
  } else if (color === "1") {
    currentStyle[1] = "#00FF00";
  } else if (color === "2") {
    currentStyle[1] = "#FF0000";
  } else if (color === "3") {
    currentStyle[1] = "#0000FF";
  } else if (color === "4") {
    currentStyle[1] = "#FFFF00";
  } else if (color === "5") {
    currentStyle[1] = "#FF00FF";
  } else if (color === "6") {
    currentStyle[1] = "#00FFFF";
  } else if (color === "7") {
    currentStyle[1] = "#FFFFFF";
  }
  themeChange();
}

function ls_command() {
  let out = make_output();
  for (child in filemanager.folderChilds(currentDirectory)) {
    out.innerHTML += `${child.split("/").pop()} : ${filemanager.getType(
      `${currentDirectory}${child}`
    )}<br />`;
  }
  out.innerHTML = out.innerHTML.slice(0, -1);
  return out;
}

function cd_command(directory) {
  if (directory === "..") {
    directory = currentDirectory.split("/").slice(0, -2).join("/");
    if (directory === "") {
      directory = "/";
    }
  } else if (directory[0] !== "/") {
    directory = currentDirectory + directory;
  }
  if (!filemanager.exists(directory, "folder")) {
    let out = make_output();
    out.innerHTML = "Folder not found";
    return out;
  }
  currentDirectory = directory + (directory !== "/" ? "/" : "");
  let out = make_output();
  out.innerHTML = `Changed directory to ${directory}${
    directory !== "/" ? "/" : ""
  }`;
  return out;
}

function rm_command(file) {
  if (file[0] !== "/") {
    file = currentDirectory + file;
  }
  if (!filemanager.exists(file, "file")) {
    let out = make_output();
    out.innerHTML = "File not found";
    return out;
  }
  let out = make_output();
  out.innerHTML = filemanager.deleteFile(file);
  return out;
}

function rmdir_command(directory) {
  if (directory[0] !== "/") {
    directory = currentDirectory + directory;
  }
  if (
    directory === currentDirectory.split("/").slice(0, -1).join("/") ||
    directory === currentDirectory
  ) {
    let out = make_output();
    out.innerHTML = "Cannot remove current directory";
    return out;
  }
  if (!filemanager.exists(directory, "folder")) {
    let out = make_output();
    out.innerHTML = "Folder not found";
    return out;
  }
  let out = make_output();
  out.innerHTML = filemanager.deleteFolder(directory);
  return out;
}

function mkdir_command(directory) {
  if (directory[0] !== "/") {
    directory = currentDirectory + directory;
  }
  let out = make_output();
  out.innerHTML = filemanager.makeFolder(directory);
  return out;
}

function mkFile_command(file) {
  if (file[0] !== "/") {
    file = currentDirectory + file;
  }
  let out = make_output();
  out.innerHTML = filemanager.makeFile(file);
  return out;
}

function cat_command(file) {
  if (file[0] !== "/") {
    file = currentDirectory + file;
  }
  let out = make_output();
  out.innerHTML = filemanager.readFile(file);
  return out;
}

function touch_command(file, content) {
  if (file[0] !== "/") {
    file = currentDirectory + file;
  }
  if (filemanager.exists(file, "file")) {
    let out = make_output();
    out.innerHTML = filemanager.writeFile(file, content);
    return out;
  } else {
    let out = make_output();
    filemanager.makeFile(file);
    out.innerHTML = filemanager.writeFile(file, content);
    out.innerHTML = "File Created and Written";
    return out;
  }
}

function rename_command(file, newName) {
  if (file[0] !== "/") {
    file = currentDirectory + file;
  }
  if (file === currentDirectory || file === currentDirectory + "/") {
    let out = make_output();
    out.innerHTML = "Cannot rename current directory";
    return out;
  }
  let out = make_output();
  out.innerHTML = filemanager.rename(file, newName);
  return out;
}

function calc_command(expression) {
  let out = make_output();
  out.innerHTML = eval(expression);
  return out;
}

async function ifconfig_command() {
  let out = make_output();
  let ip;
  await fetch("https://httpbin.org/ip", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  })
    .then((response) => response.json())
    .then((data) => {
      ip = data.origin;
    });
  out.innerHTML = `Public IP: ${ip}`;
  return out;
}

function time_command() {
  let out = make_output();
  out.innerHTML = new Date().toLocaleTimeString();
  return out;
}

function date_command() {
  let out = make_output();
  out.innerHTML = new Date().toLocaleDateString();
  return out;
}

function theme_command(theme) {
  let out = make_output();
  if (theme === "1") {
    currentStyle[0] = "#c2c2ab";
    currentStyle[1] = "#16162c";
    currentStyle[2] = "#222244";
    currentStyle[3] = "#c2c2ab";
    themeChange();
  } else if (theme === "2") {
    currentStyle[0] = "#e4c9ed";
    currentStyle[1] = "#261e3c";
    currentStyle[2] = "#3e385a";
    currentStyle[3] = "#e4c9ed";
    themeChange();
  } else if (theme === "3") {
    currentStyle[0] = "#91a4aa";
    currentStyle[1] = "#1b2123";
    currentStyle[2] = "#374448";
    currentStyle[3] = "#91a4aa";
    themeChange();
  } else if (theme === "4") {
    currentStyle[0] = "#ffc90e";
    currentStyle[1] = "#2b0006";
    currentStyle[2] = "#5c3839";
    currentStyle[3] = "#ffc90e";
    themeChange();
  } else if (theme === "5") {
    currentStyle[0] = "#c2c2ab";
    currentStyle[1] = "#0b1b0a";
    currentStyle[2] = "#23351c";
    currentStyle[3] = "#c2c2ab";
    themeChange();
  } else {
    out.innerHTML = "Invalid Theme";
    return out;
  }
  out.innerHTML = "Theme Changed";
  return out;
}

function echo_command(text) {
  let out = make_output();
  out.innerHTML = text;
  return out;
}

function uptime_command() {
  let out = make_output();
  out.innerHTML =
    Math.floor(
      (performance.now() - window.sessionStorage.getItem("time")) / 1000 / 60
    ) + " Minutes";
  return out;
}

function version_command() {
  let out = make_output();
  out.innerHTML = "Version 1.0.0<br />\
  Created by: <a href='https://github.com/7sndev' target='_blank' style='text-decoration: none; cursor: pointer; color:" + currentStyle[0] + " ;'>7sn - GitHub</a>";
  return out;
}

function random_command(min, max) {
  let out = make_output();
  out.innerHTML = Math.floor(Math.random() * (max - min + 1) + min);
  return out;
}

function reverse_command(text) {
  let out = make_output();
  for (let i = text.length - 1; i >= 0; i--) {
    out.innerHTML += text[i];
  }
  return out;
}

function length_command(text) {
  let out = make_output();
  out.innerHTML = text.length;
  return out;
}

function repeat_command(times, text) {
  let out = make_output();
  for (let i = 0; i < times; i++) {
    out.innerHTML += `${text}<br />`;
  }
  return out;
}

function base64_command(text) {
  let out = make_output();
  out.innerHTML = btoa(text);
  return out;
}

function decode_command(code) {
  let out = make_output();
  out.innerHTML = atob(code);
  return out;
}

function media_command(type, url) {
  let out = make_output();
  if (type === "video") {
    mediaRunner.runvideo(url);
    out.innerHTML = "Video Played";
  } else if (type === "image") {
    mediaRunner.viewImage(url);
    out.innerHTML = "Image Viewed";
  } else {
    out.innerHTML = "Invalid Media Type";
  }
  return out;
}

async function runCommand() {
  commandValue = temp.toLowerCase().split(" ")[0];
  updata_commands();
  const outputs = [];
  if (commandValue === "clear" || commandValue === "cls") {
    clear_terminal();
    return;
  } else if (commandValue === "") {
    addLastCommand();
    reset_command();
    return;
  } else if (commandValue === "version") {
    outputs.push(version_command());
  } else if (commandValue === "exit" || commandValue === "quit") {
    window.close();
  } else if (commandValue === "uptime") {
    outputs.push(uptime_command());
  } else if (commandValue === "help") {
    outputs.push(help_command());
  } else if (commandValue === "ls" || commandValue === "dir") {
    outputs.push(ls_command());
  } else if (commandValue === "ifconfig" || commandValue === "ipconfig") {
    let ip = await ifconfig_command();
    outputs.push(ip);
  } else if (commandValue === "time") {
    outputs.push(time_command());
  } else if (commandValue === "date") {
    outputs.push(date_command());
  } else {
    let commandValue = temp.toLowerCase();
    let commandValues = commandValue.split(" ");
    if (commandValues[0] === "color") {
      change_color(commandValues.length === 1 ? "0" : commandValues[1]);
    } else if (commandValues[0] === "colorbg") {
      change_colorbg(commandValues.length === 1 ? "0" : commandValues[1]);
    } else if (commandValues[0] === "theme") {
      outputs.push(
        theme_command(commandValues.length === 1 ? "0" : commandValues[1])
      );
    } else if (commandValues[0] === "calc") {
      if (commandValues.length < 2) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      }
      let expression = command.value.split(" ").slice(1).join(" ");
      outputs.push(calc_command(expression));
    } else if (commandValues[0] === "echo") {
      if (commandValues.length < 2) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      }
      let text = command.value.split(" ").slice(1).join(" ");
      outputs.push(echo_command(text));
    } else if (commandValues[0] === "rename") {
      if (commandValues.length < 3) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      }
      let dir = command.value.split(" ")[1];
      let name = command.value.split(" ")[2];
      outputs.push(rename_command(dir, name));
    } else if (commandValues[0] === "help") {
      if (commandValues.length === 1) outputs.push(help_command());
    } else if (commandValues[0] === "cd") {
      if (commandValues.length < 2) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      } else {
        let dir = command.value.split(" ")[1];
        outputs.push(cd_command(dir));
      }
    } else if (commandValues[0] === "rm") {
      if (commandValues.length < 2) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      } else {
        let dir = command.value.split(" ")[1];
        outputs.push(rm_command(dir));
      }
    } else if (commandValues[0] === "rmdir") {
      if (commandValues.length < 2) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      } else {
        let dir = command.value.split(" ")[1];
        outputs.push(rmdir_command(dir));
      }
    } else if (commandValues[0] === "mkdir") {
      if (commandValues.length < 2) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      } else {
        let dir = command.value.split(" ")[1];
        outputs.push(mkdir_command(dir));
      }
    } else if (commandValues[0] === "mkfile") {
      if (commandValues.length < 2) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      } else {
        let dir = command.value.split(" ")[1];
        outputs.push(mkFile_command(dir));
      }
    } else if (commandValues[0] === "cat") {
      if (commandValues.length < 2) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      } else {
        let dir = command.value.split(" ")[1];
        outputs.push(cat_command(dir));
      }
    } else if (commandValues[0] === "touch") {
      if (commandValues.length < 3) {
        let out = make_output();
        out.innerHTML = "use help command to more information";
        outputs.push(out);
      } else {
        let dir = command.value.split(" ")[1];
        let content = command.value.split(" ").slice(2).join(" ");
        outputs.push(touch_command(dir, content));
      }
    } else if (commandValues[0] === "random") {
      outputs.push(random_command(commandValues[1], commandValues[2]));
    } else if (commandValues[0] === "reverse") {
      let text = command.value.split(" ").slice(1).join(" ");
      outputs.push(reverse_command(text));
    } else if (commandValues[0] === "repeat") {
      let times = parseInt(command.value.split(" ")[1]);
      let text = command.value.split(" ").slice(2).join(" ");
      outputs.push(repeat_command(times, text));
    } else if (commandValues[0] === "base64") {
      let text = command.value.split(" ").slice(1).join(" ");
      outputs.push(base64_command(text));
    } else if (commandValues[0] === "decode") {
      let code = command.value.split(" ").slice(1).join(" ");
      outputs.push(decode_command(code));
    } else if (commandValues[0] === "media") {
      let type = command.value.split(" ")[1];
      let url = command.value.split(" ").slice(2).join(" ");
      outputs.push(media_command(type, url));
    } else if (commandValues[0] === "length") {
      let text = command.value.split(" ").slice(1).join(" ");
      outputs.push(length_command(text));
    } else {
      let out = make_output();
      try {
        out.innerHTML = Function('"use strict";return (' + expression + ")")();
      } catch {
        out.innerHTML = "Invalid expression";
      }
      outputs.push(out);
    }
  }
  addLastCommand();
  for (let i = 0; i < outputs.length; i++) terminal.append(outputs[i]);
  reset_command();
}

function getLastCommand() {
  if (commands.length === 0) return;
  command.value = commandsReverse[commandsReverse.indexOf(command.value) + 1] || commandsReverse[0];
  setTimeout(() => {
    command.selectionStart = command.selectionEnd = command.value.length;
    command.focus();
  }, 10);
}

function getNotLastCommand() {
  if (commands.length <= 0) return;
  command.value = commands[commands.indexOf(command.value) + 1] || commands[0];
}

function auto_complete() {
  for (let commandd of [
    "cls",
    "clear",
    "exit",
    "quit",
    "help",
    "color",
    "colorbg",
    "ls",
    "dir",
    "cd",
    "mkdir",
    "rmdir",
    "rm",
    "cat",
    "mkfile",
    "touch",
    "ipconfig",
    "ifconfig",
    "time",
    "date",
    "theme",
    "rename",
    "calc",
    "echo",
    "uptime",
    "version",
    "reverse",
    "length",
    "repeat",
    "base64",
    "decode",
  ]) {
    if (commandd.startsWith(command.value)) {
      command.value = commandd;
      command.selectionStart = command.selectionEnd = command.value.length;
      command.focus();
      break;
    }
  }
}

document.querySelector(".terminal").addEventListener("click", () => {
  document.querySelector(".command").focus();
});

document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    updata_command();
    await runCommand();
  } else if (event.key === "ArrowUp") {
    getLastCommand();
  } else if (event.key === "ArrowDown") {
    getNotLastCommand();
  } else if (event.key === "Tab") {
    event.preventDefault();
    auto_complete();
  } else if (event.key === "Escape") {
    document.querySelector(".program").style.display = "none";
    document.querySelector(".terminal").style.display = "block";
    theme_command("1");
    themeChange();
      for (let child of mediaRunner.app.children) {
        child.remove();
      }
  }
});

window.runCommands = {
  runCommand,
  getLastCommand,
  getNotLastCommand,
};
