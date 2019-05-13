# jquery-chMove.js
基于jquery的移动缩小放大元素的插件
将会对传入元素内的子元素添加移动与改变大小功能

调用方法
new chMove(Element,[minWidth],[minHeight],[isAllChange])
Element: 用于获取子元素的Element
minWidth： number，元素缩小宽度后的最小值
minHeight：number，元素缩高度小后的最小值
isAllChange：true||false,是否所有子元素都添加功能

如果无需所有元素添加，需将isAllChange设为false，并在需要移动的子元素上添加属性 data-move='true'
例如：
```
<div class="zoom_box">
	<div id="asdwe1245qwd" class="zoom_box_li " data-move=''>我是测试模块3</div>
	<div id="asdqwd" class="zoom_box_li " data-move='true'>我是测试模块1</div>
	<div id="asdweqwd" class="zoom_box_li " data-move='true'>我是测试模块2</div>
</div>
<script>
var ch = new chMove($('.zoom_box'),20,20,false)
</script>
``` 
如果需要对每个元素设置不同的minWidth与minHeight则需要在每个元素上添加data-minWidth与data-minHeight自定义属性
例如：
```
<body>
<div class="zoom_box">
	<div id="asdwe1245qwd" class="zoom_box_li " data-move=''>我是测试模块3</div>
	<div id="asdqwd" class="zoom_box_li " data-move='true'>我是测试模块1</div>
	<div id="asdweqwd" class="zoom_box_li " data-move='true' data-minWidth='50' data-minHeight='50'>我是测试模块2</div>
</div>
</body>
<script>
	var ch = new chMove($('.zoom_box'),20,20,false)
</script>
```
chMove在每次选中元素时都会实时计算元素的位置与大小，但是当选中元素时改变该元素的大小需要调用synData()方法
例如：
```
<body>
<input id="width" type="text" />
<button onclick="aaa()">确定</button>
<div class="zoom_box">
	<div id="asdwe1245qwd" class="zoom_box_li " >我是测试模块3</div>
	<div id="asdqwd" class="zoom_box_li ">我是测试模块1</div>
	<div id="asdweqwd" class="zoom_box_li " >我是测试模块2</div>
</div>
</body>
<script>
function aaa(){
	console.log(parseInt($('#width').val()))
	console.log(ch.clickDiv)
	$(ch.clickDiv).css('width',parseInt($('#width').val()))
	ch.synData()
}
var ch = new chMove($('.zoom_box'),20,20,true)
</script>
```

chMove默认点击其他元素时将会取消选中边框，如果有其他规则需求,点击某些元素不取消边框时，可以调用setkeepShow(Text)方法
text是一个判断条件的字符串
例如：
```
var ch = new chMove($('.zoom_box'),20,20,false)
		ch.setkeepShow("$(square).prop('tagName')=='INPUT'")
```

  注意事项：
    将会对传入的element与其子元素添加'position'：'absolute'
    使用ES6语法，应用时请注意兼容性
