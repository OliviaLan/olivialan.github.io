Pie loading; 
float dis;
int count=1;
void setup(){ 
size(400,300); 
background(#294a63); 
smooth(); 
frameRate(100);
}

void draw(){ 
loading=new Pie(dis);//实例化 
dis=1;

println(count);
if(frameCount==100){ 
  frameCount=0; 
  count++;
}
if(count%6==1||count%6==2){ 
  pushMatrix();
    if(count%6==1){ 
    translate(dis*frameCount/8,-dis*frameCount/8);
    background(#294a63);
    loading.pie1(); 
    }
    if(count%6==2){ 
    translate(-dis*frameCount/8,dis*frameCount/8);
    background(#294a63);
    loading.pie1(); 
    }
  popMatrix();
  loading.pie3();
  loading.pie2(); 
} 
if(count%6==3||count%6==4){ 
  pushMatrix();
    if(count%6==3){ 
    translate(0,dis*frameCount/8);
    background(#294a63);
    loading.pie2(); 
    }
    if(count%6==4){ 
    translate(0,-dis*frameCount/8);
    background(#294a63);
    loading.pie2(); 
    }
  popMatrix();
  loading.pie3();
  loading.pie1(); 
} 
if(count%6==5||count%6==0){ 
  pushMatrix();
    if(count%6==5){ 
    translate(-dis*frameCount/8,-dis*frameCount/8);
    background(#294a63);
    loading.pie3(); 
    }
    if(count%6==0){ 
    translate(dis*frameCount/8,dis*frameCount/8);
    background(#294a63);
    loading.pie3(); 
    }
  popMatrix();
  loading.pie1();
  loading.pie2(); 
} 
}

class Pie{ 
float dis; 
//构造函数 
Pie(float tempStop){ 
dis=tempStop; 
} 

void pie1(){ 
noStroke();
  fill(#031926);
  arc(width/2, height/2, 100, 100, -PI/2, PI/6,PIE); 
} 

void pie2(){ 
noStroke();
  fill(#468189);
  arc(width/2, height/2, 100, 100, PI/6, 5*PI/6,PIE); 
} 
  
void pie3(){ 
noStroke();
  fill(#77ACA2);
  arc(width/2, height/2, 100, 100, 5*PI/6,3*PI/2,PIE);
}  

}