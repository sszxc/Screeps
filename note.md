# 教程文档

## 官方

[Screeps 官方中文文档](https://screeps-cn.gitee.io/index.html)

[Screeps 中文 API 文档](https://screeps-cn.gitee.io/api/)

## 工具

[Creep Calculator](https://screepspl.us/services/creep-calculator/)

## 大佬

[Screep 中文教程目录 HoPGoldy](https://www.jianshu.com/p/5431cb7f42d3)

[Screeps 进阶技巧 Scorpior](https://zhuanlan.zhihu.com/p/104412058)

[Screeps 入门教程 0·机制 笨熊之家](https://twodam.net/Tutorial-for-Screeps-0)

[Screeps 游玩指北 趣味的吃](https://www.jianshu.com/p/9c4425531cc7)

# 笔记

## 环境配置

[Screeps 使用 VSCode 进行开发并添加自动补全](https://www.jianshu.com/p/5603d0c486b1)

然后 打开游戏代码存放目录，执行如下命令安装声明文件 ：
```
npm install @types/screeps @types/lodash@3.10.1
```

## 常见命令

设置建筑工地可以使用上方快捷图标“Construct”，或者使用以下代码：
```
Game.spawns['Spawn1'].room.createConstructionSite(42, 32, STRUCTURE_EXTENSION);
Game.spawns['Spawn1'].room.createConstructionSite(39, 32, STRUCTURE_ROAD);
```

# TODO

- [ ] Defender 逻辑