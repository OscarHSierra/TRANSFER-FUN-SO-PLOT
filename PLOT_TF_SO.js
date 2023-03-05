var a= document.getElementById("input_a");
var b= document.getElementById("input_b");
var c= document.getElementById("input_c");

var Ro=0;
var Wn=0;
var k=0;

var boton=document.getElementById("boton");
var botonayuda=document.getElementById("botonayuda");

var r=document.getElementById("resultado");
var r2=document.getElementById("ayuda");

var Tp=0;
var Ganancia=0.0;
var Ts=0;
var expression="";
var aux=0;
var ayudav=0;


function ayuda()
{
    if(ayudav==1)
    {
        ayudav=0;
        r2.innerHTML="";

    }
    else
    {
        ayudav=ayudav+1;
        r2.innerHTML="Este programa muestra la respuesta de un sistema de segundo orden a una entrada escalon unitario, a partir de Ro(Factor de amortiguamiento), Wn(frecuencia natural del sistema) y la ganancia del sistema";
    }
}

  function draw() {
    try {

      a.value=parseFloat(a.value);
      b.value=parseFloat(b.value);
      c.value=parseFloat(c.value);
      
      k= a.value/c.value;
      Wn= Math.sqrt(c.value);
      Ro=b.value/(2*Wn);

      
      if(Ro>1 && Wn>0)
      {
        Ts=8*Ro/(Wn);
       expression =k+"*(1-e^-(("+Ro+"-("+Ro*Ro+"-1)^(1/2))*"+Wn+"*x))"
      }

      if(Ro==1 && Wn>0)
      {
        Ts=4/(Ro*Wn);
        expression =k+"*(1-(e^(-x*"+Wn+"))*(1 +" +Wn+ "*x))"
      }

      if(Ro==0 && Wn>0)
      {
        Ts= 4*(Math.PI/(Wn));
        console.log(Ro);
        expression =k+"*(1-(cos("+ Wn+"*x)))"
      }

      if(Ro>0 && Ro<1 && Wn>0)
      {
            Ts=4/(Ro*Wn);
            aux=Math.atan(Ro/Math.sqrt(1-Ro*Ro));
            console.log(aux);
            expression =k+"*(1-e^(-x*"+Ro+"*"+Wn+")*(cos(("+ Wn+"* (1 - "+Ro*Ro+") ^ (1/2) )*x ) +" + "("+Ro+"/(1-"+Ro*Ro+")^(1/2))*"+"sin(("+Wn+"*(1-"+Ro*Ro+")^(1/2))*x)))"
      }
     
      const expr = math.compile(expression)
      const xValues = math.range( 0 , 2*Ts, (0.01*Ts)).toArray()
      const yValues = xValues.map(function (x) {   return expr.evaluate({x: x})   })
      const trace1 = {
        x: xValues,
        y: yValues,
        textfont: {
            family: 'Arial Black',
            size: 18,
            color: '#1f77b4'
          },
        type: 'scatter'
      }
      const data = [trace1]
      
      var layout = {
        autosize: true,
        margin: {
            l: 80,
            r: 50,
            b: 60,
            t: 20,
            pad: 4
          },
        xaxis: { 
          tickfont: {
            family: 'Arial Black',
            size: 24,
            color: 'black'
          },
            color: '#000000',
            tickfont_family:'Arial Black',
            title: {
              text: 'Tiempo(s)',
              autosize: true,
              automargin: false,
              font: {family: 'Arial Black',
               size: 15,color: '#000000'
              }
            }
        },

        yaxis: {
          title: {
            text: 'Amplitud',
            autosize: true,
            automargin: false,
            font: {family: 'Arial Black',
             size: 15,color: '#000000'
            }},
          tickfont: {
            family: 'Arial Black',
            size: 24,
            color: 'black'
          },
          autosize: true,
          automargin: true,
          titlefont: { size:15 },
          color: '#000000'
        },  
        paper_bgcolor: '#2760B8',
        plot_bgcolor: '#c7c7c7',
        showlegend: false
      };
      Plotly.newPlot('plot', data, layout, {displayModeBar: false})
      if(Wn<=0 || Ro<0)
      {
        alert("Error de parametros")
      }
    }
    catch (err) {
      console.error(err)
      alert(err)
    }
  }
botonayuda.addEventListener("click",ayuda);
boton.addEventListener("click",draw);