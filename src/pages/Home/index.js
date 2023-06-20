
import Bar from "@/components/Bar";

function Home() {

  return (<div>
		<Bar 
			title={'前端框架受喜爱度'}
			name={'喜爱程度'}
			xData={['react','angular','vue']}
			yData={[50,20,30]}
		/>
	</div>);
}

export default Home;
