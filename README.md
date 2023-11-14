# Creator URL Resolver Service

Cocos Creator 地址跳转服务的配置仓库

仓库存放地址跳转服务器使用的配置文件，合并之前需要确保单元测试完全通过

[![CI Status](https://github.com/cocos/creator-url-resolver/actions/workflows/ci.yaml/badge.svg)](https://github.com/cocos/creator-url-resolver/actions/workflows/ci.yaml)
![Typescript](https://img.shields.io/badge/Language-Typescript-blue.svg)
![Javascript](https://img.shields.io/badge/Language-javascript-blue.svg) ![JSON](https://img.shields.io/badge/Language-json-blue.svg)

## 介绍

本仓库作为`Cocos Creator`的地址管理仓库，该仓库配合服务器进行使用; 具体的流程如下:

1. 服务器定时(或者用户自动发起)拉取该仓库到服务器
2. 加载仓库中的配置以及脚本到服务器内存
3. 根据用户请求的参数匹配对应的短链接地址以及脚本
4. 匹配到数据并且运行脚本加工短链接地址，并且服务端直接`301`跳转，没有匹配到数据跳转`404`

仓库的初始化、环境安装步骤

## 配置

短链接的入口文件为`package.json`文件中的`url-resolver`字段

**package.json 的配置示例**

```javascript
  "url-resolver": {
    "version": "1.0.0",  // 配置版本号
    "routers": [
      {
        "mount": "creator/manual",  // 子路由
        "pipe": {    // 地址处理函数
          "file": "creator/manual.js",
          "method": "parseManual"
        },
        "config": "/creator/manual.json5"  // 地址跳转配置
      }
    ]
  },
```

> `pipe` 如果导出多个方法，需要指定对应的方法名以及文件路径，如果 pipe 只导出一个默认方法，那么可以只配置路径如："pipe": "creator/manual.js"

**manual.json5 的配置示例**

```json5
{
  // 标签文档
  label: 'https://docs.cocos.com/creator/manual/zh/ui-system/components/editor/label.html',
  ...
}

```

**creator/manual.js 的配置示例**

```javascript
/**
 * @param {*} mount 表示请求的句柄，对应 creator/manual
 * @param {*} url 返回 json5中匹配到的url地址
 * @param {*} param 用户访问时所携带的参数
 * @returns
 */
exports.parseManual = (mount, url, param) => {
    // 用户进行url处理的逻辑

    return url;
};
```

**用户请求示例**

用戶请求地址如下：

```javascript
https://{{host}}/resolve-url/v1/creator/manual?version=3.7.2&name=label&lang=en
```

服务端会根据请求的`creator/manual`以及`name`匹配到`json`中的`label`字段的`url`, 并且调用函数`parseManual`, 对`url`进行处理，并且返回处理后
的`url`进行跳转
