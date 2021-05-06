const fs = require("fs");
const path = require("path");

class InheritancePlugin {
  constructor(options) {
    this.name = options.name || "InheritancePlugin";
    this.parentPath = options.parentPath || path.resolve(__dirname, "..", "default");
    this.childPath = options.childPath || __dirname;
    this.fileExtensions = options.fileExtensions || [".js", ".json", ".ts", ".vue", ".graphql"];
  }

  apply(resolver) {
    const target = resolver.ensureHook("existing-file");
    resolver
      .getHook("raw-file")
      .tapAsync(this.name, (request, resolveContext, callback) => {
        const currentPath = request.path;

        if (this.fileExists(currentPath)) {
          return callback();
        }

        let newPath = this.resolveFile(currentPath.replace(this.childPath, this.parentPath));

        if (!this.fileExists(newPath)) {
          return callback();
        }

        const newResolverObject = {
          ...request,
          path: newPath,
          request: undefined,
        };

        return resolver.doResolve(
          target,
          newResolverObject,
          `resolved by ${this.name} to ${newPath}`,
          resolveContext,
          callback
        );
      });
  }

  fileExists(path) {
    if (fs.existsSync(path)) {
      return true;
    }

    let fileExists = false;
    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(path + fileExtension)) {
        return (fileExists = true);
      }
    });

    return fileExists;
  }

  resolveFile(path) {
    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(path + fileExtension)) {
        path = path + fileExtension;
        return;
      }
    });

    this.fileExtensions.forEach((fileExtension) => {
      if (fs.existsSync(path + "/index" + fileExtension)) {
        path = path + "/index" + fileExtension;
        return;
      }
    });

    return path;
  }
}

module.exports = InheritancePlugin;
