
//시간표에 과목 넣기 

function addSubject(event){
  const X = event.offsetX;
  ctx.fillStyle="white";
  const yS = []

  for(i=0;i<6;i++){
    const y = ((100+(100*i)<=event.offsetY)&(event.offsetY<=200+(100*i)));
    yS.push(y);
  }

  for(j=0;j<6;j++){
    for(i=0;i<5;i++){
      const plus = (120*i);
      const yPlace = 160+(100*j);
      const allX = ((100+plus)<=X)&(X<=(220+plus));
      if(allX&yS[j]){
        ctx.fillRect(120+plus, yPlace-30, 90, 40);
        ctx.fillStyle = "black";
        ctx.fillText(text, 130+plus, yPlace);
      }
    }
  }
}

canvas.addEventListener("click", addSubject);
