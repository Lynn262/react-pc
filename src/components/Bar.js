import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function Bar({title , xData , yData , name}){
	const domRef = useRef();
	const chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(domRef.current);
    // 绘制图表
    myChart.setOption({
      title: {
        text: title,
      },
      tooltip: {},
      xAxis: {
        data: xData,
      },
      yAxis: {},
      series: [
        {
          name:'排名',
          type: "bar",
          data: yData,
        },
      ],
    });
  };
	// 初始化一次时 执行
	useEffect(()=>{
		chartInit()
	},[])
	return (
		<div ref={domRef} style={{width:'500px',height:'500px'}}>
		</div>
	)
}

export default Bar;