/*
 * @Author: zhanfenghai
 * @LastEditTime: 2021-02-23 17:21:11
 * @LastEditors: zhanfenghai
 * @Description:
 * @FilePath: \my-vite2-app\plugins\vite-plugin-inject.js
 */
import fs from "fs";
import path from "path";
const RE_INJECT_POINT = /<!--\s*(js|css)_inject_point((?:_|\s+)(chunk|asset|text|inline)_(\S+))?(\s+if_(\S+)\s*)?\s*-->/gi;

const replaceInjectPoint = function (match) {
  // var args = this.options.args
  // var assets = this.options.assets
  var texts = {};
  texts["test"] = fs
    .readFileSync(
      path.resolve(process.cwd(), "./src/assets/inject/test.js"),
      "utf-8"
    )
    .replace(/\/\*[\s\S]*\*\//gm, "");
  // var self = this

  // do not replace if arg value not `true` in options.args
  if (match.ifArg && (!args || !args[match.ifArg])) {
    return "";
  }

  var renderTagFn = match.type === "js" ? renderScriptTag : renderStyleTag;
  var renderInlineTagFn =
    match.type === "js" ? renderInlineScriptTag : renderInlineStyleTag;

  // if (!match.ex) {
  //     return renderTagFn(match.type === 'js' ? htmlPluginArgs.assets.js : htmlPluginArgs.assets.css)
  // }

  switch (match.exType) {
    // case 'chunk':
    //     var chunk = htmlPluginArgs.assets.chunks[match.exName]
    //     if (chunk) {
    //         return renderTagFn(match.type === 'js' ? chunk.entry : chunk.css)
    //     } else {
    //         throw new AssetInjectError(`no chunk "${match.exName}"`, match)
    //     }
    // case 'inline':
    //     var chunk = htmlPluginArgs.assets.chunks[match.exName]
    //     if (chunk) {
    //         var _assets = match.type === 'js' ? chunk.entry : chunk.css
    //     } else {
    //         throw new AssetInjectError(`no chunk "${match.exName}" for inline`, match)
    //     }
    //     if (!Array.isArray(_assets)) {
    //         _assets = [_assets]
    //     }
    //     return _assets.map(function (assetUrl) {
    //         return renderInlineTagFn(self.getAssetSource(compilation, assetUrl))
    //     }).join('\n')
    case "asset":
      var asset = assets && assets[match.exName];
      if (!asset && assets && typeof assets.$find === "function") {
        asset = assets.$find.call(null, match.exName, match.type);
      }
      if (asset) {
        return renderTagFn(asset);
      } else {
        throw new AssetInjectError(`no asset "${match.exName}"`, match);
      }
    case "text":
      var text = texts && texts[match.exName];
      if (!text && texts && typeof texts.$find === "function") {
        text = texts.$find.call(null, match.exName, match.type);
      }
      if (text) {
        return renderInlineTagFn(text);
      } else {
        throw new AssetInjectError(`no text "${match.exName}"`, match);
      }
    default:
      throw new AssetInjectError(`unsupported type "${match.exType}"`, match);
  }
};

function renderStyleTag(path) {
  return renderTag(path, _renderStyleTag);
}

function renderScriptTag(path) {
  return renderTag(path, _renderScriptTag);
}

function renderTag(path, renderFn) {
  if (Array.isArray(path)) {
    return path.map(renderFn).join("\n");
  } else {
    return renderFn(path);
  }
}

function _renderStyleTag(path) {
  return '<link rel="stylesheet" href="' + path + '">';
}

function _renderScriptTag(path) {
  return '<script src="' + path + '"></script>';
}

function renderInlineStyleTag(text) {
  return "<style>" + text + "</style>";
}

function renderInlineScriptTag(text) {
  return "<script>" + text + "</script>";
}

function renderFaviconTag(path) {
  return '<link rel="icon" href="' + path + '">';
}

/* AssetInjectError */

function AssetInjectError(message, match) {
  this.name = "AssetInjectError";
  this.message = `${message}, match "${match.match}"`;
  this.match = match;
  Error.captureStackTrace(this, AssetInjectError);
}

export default function (options = {}) {
  // options.entry = options.entry || "./mock/index.js";

  // if (!path.isAbsolute(options.entry)) {
  //   options.entry = path.resolve(process.cwd(), options.entry);
  // }

  return {
    transformIndexHtml(html) {
      console.log("transformIndexHtml");
      // return html
      return html.replace(
        RE_INJECT_POINT,
        function (match, type, ex, exType, exName, ifMatch, ifArg) {
          return replaceInjectPoint({
            match: match,
            type: type,
            ex: ex,
            exType: exType,
            exName: exName,
            ifArg: ifMatch ? ifArg : null,
          });
        }
      );
    },
  };
}
