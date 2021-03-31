1. context.moveTo 设置起始点

2. context.lineTo 

3. context.stroke()绘制

4. context.strokeStyle 设置线条颜色

5. context.lineWidth设置线条宽度

   ```js
   		//绘制一个三角形
       const context = cvs.getContext('2d');
       context.moveTo(30,30)
       context.lineWidth="6"
       context.strokeStyle="#ff0000"
       context.lineTo(150,30)
       context.lineTo(100,90)
       // context.lineTo(30,30)
       context.closePath()
       context.stroke()
   ```

   

6. context.beginPath(); 切断之前关系，重置当前路径

   ```js
   //绘制一个三条线条不同颜色的三角形    
       const context = cvs.getContext('2d');
       context.moveTo(30,30)
       context.lineWidth="6"
       context.strokeStyle="#ff0000"
       context.lineTo(150,30)
       context.stroke()
       context.beginPath();
   
       context.lineWidth="4"
       context.strokeStyle="#333"
       context.moveTo(150,30)
       context.lineTo(100,90)
       context.stroke()
       context.beginPath();
       
       context.lineWidth="5"
       context.strokeStyle="blue"
       context.moveTo(100,90)
       context.lineTo(30,30)
       context.stroke()
   ```

7. context.font 绘制字体的样式(字体粗细 大小 字体)

8. context.strokeText 绘制描边字体

9. context.fillText绘制 填充字体

10. context.textAlign 文字水平方向对齐方式 (start | left | center | right |end)

11. context.textBaseline 文字垂直方向对齐方式 (top hanging|middle |alphabetic| deographic|bottom)

    ```js
    		//绘制字体,对齐方式位置是基于坐标点的位置
    		const context = cvs.getContext('2d');
        context.moveTo(30, 0);
        context.lineTo(30, 120);
        context.stroke();
        context.beginPath();
        context.moveTo(0, 30);
        context.lineTo(120, 30);
        context.stroke();
        context.beginPath();
        context.moveTo(0, 100);
        context.lineTo(120, 100);
        context.stroke();
        
        context.font='600 24px cursive';
        context.textAlign='center';
        context.textBaseline='middle';
        context.fillText('画布', 30, 30, 200);
        context.strokeText('画布', 30, 100, 200);
        
    ```

    

12. cvs.toDataURL 将画布保存为图片(cvs 为canvas节点)

    ```js
    		const imgUrl = cvs.toDataURL('image/png', 1);
        console.log(imgUrl);
    ```

13. context.rect 绘制矩形

14. context.stroke 绘制

15. context.fillStyle 填充颜色

16. context.fill 填充

17. context.strokeRect 一次绘制一个矩形

18. context.fillRect 一次或填充一个矩形

19. context.clearRect 清楚矩形内部像素

    ```js
    		const context = cvs.getContext('2d');
        // 1、描边绘制填充形成矩形
        context.rect(30, 30, 50, 40);
        context.stroke();
        context.fillStyle='#ff0000';
        context.fill();
        
        // 2、一次绘制或填充一个矩形
        context.strokeRect(30, 100, 50, 40);
        context.fillRect(30, 100, 50, 40);
        
        // 清楚矩形内部像素
        context.clearRect(40, 110, 20, 20);
    ```

    

20. context.arc(x, y, radius, Math.PI / 180 * startAngle, Math.PI / 180 * endAngle, anticlockwise);绘制圆

    ```js
        //绘制一个起点在150，50半径为15，从0度到180度的顺时针圆
    		const context = cvs.getContext('2d');		
        context.arc(150, 50, 15, 0, Math.PI, false);
        context.stroke();
    ```

    

21. context.drawImage。绘制图片

    ```js
     		
    		//context.drawImage(Image, dX, dY);绘制图片Image到dX,dY
    		//context.drawImage(Image, dX, dY, dWidth, dHeight);绘制图片Image到dX,dY并设置图片宽高
    		const context = cvs.getContext('2d');	
    		let img = new Image()
        img.src="./wf.jpeg"
        img.onload=()=>{
            context.drawImage(img, 10, 10, 580, 580);
        }
        //context.drawImage(Image,sx, sy, sWidth, sHeight, X, Y, Width, Height);
        //sx, sy为图片截取的坐标。sWidth, sHeight截取图片的大小。X, Y，画布的起始点。Width, 在画布中的宽高
    		const context = cvs.getContext('2d');	
    		let img = new Image()
        img.src="./wf.jpeg"
        img.onload=()=>{
            context.drawImage(img, 230, 80, 580, 580, 10, 10, 200, 200);
        }
    ```

22. 案列：刮刮卡

    ```js
    const context = cvs.getContext('2d');
        const arr = ['特等奖','一等奖','二等奖','三等奖','很遗憾，没有中奖']
        // context.globalCompositeOperation='destination-out';
        //1、绘制随机字符到画布中心位置
        const random = Math.floor(Math.random()*arr.length)
        context.strokeStyle='#ff0000';
        context.textAlign='center';
        context.textBaseline='middle';
        context.font='20px cursive';
        context.strokeText(arr[random],cvs.width/2,cvs.height/2);
        // 2、将画布导出图片设置为画布背景色
        const imgUrl = cvs.toDataURL('image/png', 1);
        cvs.style.background=`url(${imgUrl})`
        // 3、清楚画布内容，设置画布灰色遮罩
        context.clearRect(0, 0, cvs.width, cvs.height);
        context.fillStyle='#ddd';
        context.fillRect(0,0,cvs.width, cvs.height);
        // 4、鼠标按下并移动是设置跟随鼠标透明
        let flag = false
        cvs.addEventListener('mousedown',()=>{
            flag=true
        })
        cvs.addEventListener('mousemove',(e)=>{
            if (flag) {
                // 1⃣️.跟随鼠标清除当前填充内容
                // context.clearRect(e.offsetX, e.offsetY, 10, 10);
                
                // 2⃣️、设置属性，让填充的矩形为透明
                context.globalCompositeOperation='destination-out';
                context.fillRect(e.offsetX, e.offsetY, 10, 10);
            }
        })
        cvs.addEventListener('mouseup',()=>{
            flag=false
        })
    ```

    

    
