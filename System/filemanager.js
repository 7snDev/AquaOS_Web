(function () {
  let jsonmanager = {};

  function setjsonmanager(json) {
    jsonmanager = json;
  }

  function updateLocalStorage() {
    localStorage.setItem("jsonmanager", JSON.stringify(jsonmanager));
  }

  function updateJSON() {
    jsonmanager = JSON.parse(localStorage.getItem("jsonmanager"));
  }

  function exists(path, type) {
    let patth = path.split("/").filter(Boolean);
    let file = jsonmanager["/"];
    for (let i = 0; i < patth.length; i++) {
      if ("childrens" in file && patth[i] in file.childrens) {
        file = file.childrens[patth[i]];
      } else {
        return false;
      }
    }
    return file.type === type;
  }

  function makeFile(path) {
    if (exists(path, "file")) return "File already exists";
    let parts = path.split("/").filter(Boolean);
    let fileName = parts.pop();
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      if (!(parts[i] in current.childrens)) return "Parent folder not found";
      current = current.childrens[parts[i]];
    }
    let id = (Math.random() * 1000000).toFixed(0) + `_${fileName}`;
    current.childrens[fileName] = { type: "file", id: id };
    let disk = JSON.parse(localStorage.getItem("disk") || "{}");
    disk[id] = "";
    localStorage.setItem("disk", JSON.stringify(disk));
    updateLocalStorage();
    return "File created successfully";
  }

  function deleteFile(path) {
    if (!exists(path, "file")) return "File not found";
    let parts = path.split("/").filter(Boolean);
    let fileName = parts.pop();
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      current = current.childrens[parts[i]];
    }
    let file = current.childrens[fileName];
    let disk = JSON.parse(localStorage.getItem("disk") || "{}");
    delete disk[file.id];
    delete current.childrens[fileName];
    localStorage.setItem("disk", JSON.stringify(disk));
    updateLocalStorage();
    return "File deleted successfully";
  }

  function readFile(path) {
    if (!exists(path, "file")) return "File not found";
    let parts = path.split("/").filter(Boolean);
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      current = current.childrens[parts[i]];
    }
    let disk = JSON.parse(localStorage.getItem("disk") || "{}");
    return disk[current.id] || "";
  }

  function writeFile(path, content) {
    if (!exists(path, "file")) return "File not found";
    let parts = path.split("/").filter(Boolean);
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      current = current.childrens[parts[i]];
    }
    let disk = JSON.parse(localStorage.getItem("disk") || "{}");
    disk[current.id] = content;
    localStorage.setItem("disk", JSON.stringify(disk));
    return "File written successfully";
  }

  function makeFolder(path) {
    if (exists(path, "folder")) return "Folder already exists";
    let parts = path.split("/").filter(Boolean);
    let folderName = parts.pop();
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      if (!(parts[i] in current.childrens)) return "Parent folder not found";
      current = current.childrens[parts[i]];
    }
    current.childrens[folderName] = { type: "folder", childrens: {} };
    updateLocalStorage();
    return "Folder created successfully";
  }

  function deleteFolder(path) {
    if (!exists(path, "folder")) return "Folder not found";
    if (!isEmpty(path)) return "Folder is not empty";
    if (path === "/") return "Cannot delete root folder";
    let parts = path.split("/").filter(Boolean);
    let folderName = parts.pop();
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      current = current.childrens[parts[i]];
    }
    delete current.childrens[folderName];
    updateLocalStorage();
    return "Folder deleted successfully";
  }

  function folderChilds(path) {
    if (!exists(path, "folder")) return "Folder not found";
    let parts = path.split("/").filter(Boolean);
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      current = current.childrens[parts[i]];
    }
    return current.childrens || {};
  }

  function rename(path, newName) {
    if (path === "/") return "Cannot rename root folder";
    let parts = path.split("/").filter(Boolean);
    let itemName = parts.pop();
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      if (!(parts[i] in current.childrens)) return "Parent folder not found";
      current = current.childrens[parts[i]];
    }
    if (!(itemName in current.childrens)) return "Item not found";
    if (newName in current.childrens) return "Name already exists";
    current.childrens[newName] = current.childrens[itemName];
    delete current.childrens[itemName];
    updateLocalStorage();
    return "Item renamed successfully";
  }

  function isEmpty(path) {
    let parts = path.split("/").filter(Boolean);
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      if (!(parts[i] in current.childrens)) return "Parent folder not found";
      current = current.childrens[parts[i]];
    }
    return Object.keys(current.childrens).length === 0;
  }

  function getType(path) {
    let parts = path.split("/").filter(Boolean);
    let current = jsonmanager["/"];
    for (let i = 0; i < parts.length; i++) {
      if (!(parts[i] in current.childrens)) return "Parent folder not found";
      current = current.childrens[parts[i]];
    }
    return current.type;
  }
  window.filemanager = {
    setjsonmanager,
    exists,
    makeFile,
    deleteFile,
    readFile,
    writeFile,
    makeFolder,
    deleteFolder,
    folderChilds,
    rename,
    getType,
  };
})();

window.onload = () => {
  document.querySelector(".command").focus();
  if (localStorage.getItem("jsonmanager") === null) {
    localStorage.setItem(
      "jsonmanager",
      JSON.stringify({
        "/": {
          type: "folder",
          childrens: {},
        },
      })
    );
  }
  filemanager.setjsonmanager(JSON.parse(localStorage.getItem("jsonmanager")));
  if (localStorage.getItem("disk") === null) {
    localStorage.setItem("disk", JSON.stringify({}));
  }
};
