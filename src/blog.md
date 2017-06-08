### 为什么要import react

页面有组件需要一些方法来继承react的方法

### 为什么要export 

把当前的代码封装成一个组件，供他人使用

### 为什么要加default ?

export default命令用于为模块指定默认输出。其他模块加载该模块时，import命令可以为其指定任意名字，并且对应的import语句不需要使用大括号.

### input里的文字用input.value就可以获得了，为什么还要用newTodo来容纳呢？

便于监听输入事件，监听todo的每次变动

### 为什么return后面要加括号

因为return 会在代码的一行末加上分号(;)