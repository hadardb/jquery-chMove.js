class chMove{
	constructor(parent,minWidth,minHeight,isAllChange){
		({left:this.divLeft,top:this.divTop,width:this.divWidth,height:this.divHeight}=getComputedStyle($(parent)[0],null))
		this.parent=parent
		this.minWidth=minWidth||40
		this.minHeight=minHeight||40
		this.isAllChange=isAllChange||false
		this.createParent()
		this.parentMouseOver()
		this.chMoveBoxMouseOut()
		this.chMoveBoxMouseDown()
		this.hideMoveBox()
	}
	createParent(){
		let html=`<div class="chMove_box" style="display: none;width:${this.divWidth};height:${this.divHeight};
		position:${this.divPosition};left:${this.divLeft};top:${this.divTop}"></div>`
		$(this.parent).css('position','absolute')
		$(this.parent).children().css('position','absolute')
		this.noBox=$(this.parent).after(html).next()
	}
	parentMouseOver(){
		$(this.parent).on('mouseover', event =>{
			var event = event || window.event
			var thisDiv=event.target || event.srcElement
			if(thisDiv!=this.parent[0]&&(this.isAllChange || $(thisDiv).attr('data-move'))){
				event.stopPropagation()
				let id=$(thisDiv).prop('id')
				let {width,height,top,left,position} = getComputedStyle($(thisDiv)[0],null)
				let li=`<div class="chMove_box_li" data-id='${id}' 
				style="width:${width};height:${height};top:${top};left:${left};position:${position};">
						</div>`
				$(this.noBox).append(li)
				$(this.noBox).show()
			}
		})
	}
	chMoveBoxMouseOut(){
		$(this.noBox).on('mouseout', function(event){
			var event = event || window.event
			var thisDiv=event.target || event.srcElement
			if($(thisDiv).hasClass('chMove_box_li')){
				if(!$(thisDiv).data('lock')){
					$(thisDiv).remove()
				}
			}
		})
	}
	chMoveBoxMouseDown(){
		let that=this
		$(that.noBox).on('mousedown', function(event) {
			var event = event || window.event
			event.stopPropagation()
			var square=event.target || event.srcElement
			if($(square).hasClass('chMove_box_li')){
				var boxID=$(square).data('id')
			}else if($(square).hasClass('square')){
				var boxID=$(square).parent().data('id')
			}
			var box=$('#'+boxID)
			var downX = event.clientX										//点击时距离body的距离
			var downY = event.clientY										//点击时距离body的距离
			var nowWidth=box[0].offsetWidth									//当前元素的宽度
			var nowHeight=box[0].offsetHeight								//当前元素的高度
			var nowTop=box[0].offsetTop										//当前元素的宽度
			var nowLeft=box[0].offsetLeft									//当前元素的高度
			var DivMinHeight=that.minHeight
			var DivMinWidth=that.minWidth
			if($(square).hasClass('chMove_box_li')){
				//添加square
				$(square).html(`
					<div class="t square"></div>
					<div class="r square"></div>
					<div class="b square"></div>
					<div class="l square"></div>
					<div class="tl square"></div>
					<div class="tr square"></div>
					<div class="bl square"></div>
					<div class="br square"></div>	
				`)
				$(square).siblings().remove()
				$(square).data('lock',true)
				$(document).on('mousemove', event =>{
					var event = event || window.event
					event.preventDefault()
					var moveY = event.clientY												//移动时距离body的距离
					var moveX = event.clientX												//移动时距离body的距离
					var changeX=moveX-downX													//移动后left的差值
					var changeY=moveY-downY													//移动后top的差值
					var newDivTop=nowTop+changeY											//Top
					var newDivLeft=nowLeft+changeX											//Top
					if(newDivLeft>=0&&newDivLeft<=$(this).width()-nowWidth){
						$(box).css({'left':newDivLeft})
						$(square).css({'left':newDivLeft})
					}
					if(newDivTop>=0&&newDivTop<=$(this).height()-nowHeight){
						$(box).css({'top':newDivTop})
						$(square).css({'top':newDivTop})
					}
					
				})
			}else if($(square).hasClass('square')){
				var squareType=$(square).attr('class').split(' ')[0]
				var noBox=$(square).parent()
				switch(squareType){
					case 't':
						$(document).on('mousemove', event =>{
							var event = event || window.event
							event.preventDefault()
							var moveY = event.clientY												//移动时距离body的距离
							var changeY=downY-moveY													//移动后高度的差值
							var newDivHeight=changeY+nowHeight										//高度
							var newDivTop=nowTop-changeY											//Top
							var usableHeight=nowTop													//高度最大值
							if(newDivHeight>=DivMinHeight&&changeY<=usableHeight){
								noBox.css('height',newDivHeight)
								box.css('height',newDivHeight)
								noBox.css('top',newDivTop)
								box.css('top',newDivTop)
							}
						})
						break;
					case 'r':
						
						$(document).on('mousemove', event =>{
							var event = event || window.event
							event.preventDefault()
							var moveX = event.clientX												//移动时距离body的距离
							var changeX=moveX-downX													//移动后宽度的差值
							var newDivWidth=changeX+nowWidth										//宽度
							var usableWidth=$(this).width()-noBox[0].offsetLeft		//宽度最大值
							if(newDivWidth>=DivMinWidth&&newDivWidth<=usableWidth){
								noBox.css('width',newDivWidth)
								box.css('width',newDivWidth)
							}
						})
						break;
					case 'b':
						
						$(document).on('mousemove', event =>{
							var event = event || window.event
							event.preventDefault()
							var moveY = event.clientY
							var changeY=moveY-downY
							var newDivHeight=changeY+nowHeight
							var usableHeight=$(this).height()-noBox[0].offsetTop
							if(newDivHeight>=DivMinHeight&&newDivHeight<=usableHeight){
								noBox.css('height',newDivHeight)
								box.css('height',newDivHeight)
							}
						})
						break;
					case 'l':
						
						$(document).on('mousemove', event =>{
							var event = event || window.event
							event.preventDefault()
							var moveX = event.clientX												//移动时距离body的距离
							var changeX=downX-moveX													//移动后宽度的差值
							var newDivWidth=changeX+nowWidth										//宽度
							var newDivLeft=nowLeft-changeX											//left
							var usableWidth=nowLeft													//宽度最大值
							if(newDivWidth>=DivMinWidth&&changeX<=usableWidth){
								noBox.css('width',newDivWidth)
								box.css('width',newDivWidth)
								noBox.css('left',newDivLeft)
								box.css('left',newDivLeft)
							}
						})
						break;
					case 'tl':
						
						$(document).on('mousemove', event =>{
							var event = event || window.event
							event.preventDefault()
							var moveX = event.clientX												//移动时距离body的距离
							var changeX=downX-moveX													//移动后宽度的差值
							var newDivWidth=changeX+nowWidth										//宽度
							var newDivLeft=nowLeft-changeX											//left
							var usableWidth=nowLeft													//宽度最大值
							var moveY = event.clientY												//移动时距离body的距离
							var changeY=downY-moveY													//移动后高度的差值
							var newDivHeight=changeX+nowHeight										//高度
							var newDivTop=nowTop-changeX											//Top
							var usableHeight=nowTop													//高度最大值
							if(newDivHeight>=DivMinHeight&&changeX<=usableHeight&&
							newDivWidth>=DivMinWidth&&changeX<=usableWidth){
								noBox.css('height',newDivHeight)
								box.css('height',newDivHeight)
								noBox.css('top',newDivTop)
								box.css('top',newDivTop)
								noBox.css('width',newDivWidth)
								box.css('width',newDivWidth)
								noBox.css('left',newDivLeft)
								box.css('left',newDivLeft)
							}
						})
						break;
					case 'tr':
						
						$(document).on('mousemove', event =>{
							var event = event || window.event
							event.preventDefault()
							var moveX = event.clientX												//移动时距离body的距离
							var changeX=moveX-downX													//移动后宽度的差值
							var newDivWidth=changeX+nowWidth										//宽度
							var usableWidth=$(this).width()-noBox[0].offsetLeft		//宽度最大值
							var moveY = event.clientY												//移动时距离body的距离
							var changeY=downY-moveY													//移动后高度的差值
							var newDivHeight=changeX+nowHeight										//高度
							var newDivTop=nowTop-changeX											//Top
							var usableHeight=nowTop													//高度最大值
							if(newDivHeight>=DivMinHeight&&changeX<=usableHeight&&
							newDivWidth>=DivMinWidth&&newDivWidth<=usableWidth){
								noBox.css('height',newDivHeight)
								box.css('height',newDivHeight)
								noBox.css('top',newDivTop)
								box.css('top',newDivTop)
								noBox.css('width',newDivWidth)
								box.css('width',newDivWidth)
							}
						})
						break;
					case 'bl':
						
						$(document).on('mousemove', event =>{
							var event = event || window.event
							event.preventDefault()
							var moveX = event.clientX												//移动时距离body的距离
							var changeX=downX-moveX													//移动后宽度的差值
							var newDivWidth=changeX+nowWidth										//宽度
							var newDivLeft=nowLeft-changeX											//left
							var usableWidth=nowLeft													//宽度最大值
							var newDivHeight=changeX+nowHeight										//高度
							var usableHeight=$(this).height()-noBox[0].offsetTop	//高度最大值
							if(newDivHeight>=DivMinHeight&&newDivHeight<=usableHeight&&
							newDivWidth>=DivMinWidth&&changeX<=usableWidth){
								noBox.css('height',newDivHeight)
								box.css('height',newDivHeight)
								noBox.css('width',newDivWidth)
								box.css('width',newDivWidth)
								noBox.css('left',newDivLeft)
								box.css('left',newDivLeft)
							}
						})
						break;
					case 'br':
						
						$(document).on('mousemove', event =>{
							var event = event || window.event
							event.preventDefault()
							var moveX = event.clientX												//移动时距离body的距离
							var changeX=moveX-downX													//移动后宽度的差值
							var newDivWidth=changeX+nowWidth										//宽度
							var usableWidth=$(this).width()-noBox[0].offsetLeft		//宽度最大值
	//						var moveY = event.clientY												//移动时距离body的距离
	//						var changeY=moveY-downY													//移动后高度的差值
							var newDivHeight=changeX+nowHeight										//高度
							var usableHeight=$(this).height()-noBox[0].offsetTop	//高度最大值
							if(newDivHeight>=DivMinHeight&&newDivHeight<=usableHeight&&
							newDivWidth>=DivMinWidth&&newDivWidth<=usableWidth){
								noBox.css('height',newDivHeight)
								box.css('height',newDivHeight)
								noBox.css('width',newDivWidth)
								box.css('width',newDivWidth)
							}
						})
						break;
				}
			}

			$(document).on('mouseup', event =>{
				nowWidth=box[0].offsetWidth									//当前元素的宽度
				nowHeight=box[0].offsetHeight									//当前元素的高度
				nowTop=box[0].offsetTop										//当前元素的宽度
				nowLeft=box[0].offsetLeft										//当前元素的高度
				$(document).unbind('mousemove')
				$(document).unbind('mouseup')
			})
		})

	}
	hideMoveBox(){
		$(document).on('mousedown',() =>{
			$(this.noBox).hide().html('')
		})
	}
}
