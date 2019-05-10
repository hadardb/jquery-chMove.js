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

/<div class="zoom_box">
	\<div id="asdwe1245qwd" class="zoom_box_li " data-move=''>我是测试模块3</div>
	\<div id="asdqwd" class="zoom_box_li " data-move='true'>我是测试模块1</div>
	\<div id="asdweqwd" class="zoom_box_li " data-move='true'>我是测试模块2</div>

/</div>
<script>
new chMove($('.zoom_box'),40,40,false)
</script>
  
  
  注意事项：
    将会对传入的element与其子元素添加'position'：'absolute'
    使用ES6语法，应用时请注意兼容性
