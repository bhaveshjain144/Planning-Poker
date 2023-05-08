
const Result = (props) => {
    const finalinputs = props.valuelist.filter((e) => e !== '?')
    var total =0;
    var count = 0;
    
    var hand = props.hand.filter((e) => e !== '?').reverse().sort(function(a,b){return a-b});
    
    var result =0;
    var index =0;
    var flag = 0;
    
    finalinputs.forEach(element => {
        total+=parseInt(element);
        count++;
    });
    
    for (index = 0; index < hand.length; index++) {
      if( (parseInt(hand[index]) >= Math.ceil(total/count))){
        flag = parseInt(hand[index]);
        console.log(flag);
        break;
      }
  }
  result = flag;
    return (
      <div className="result">
        <label  className="outcome">The result is {result}</label>
          {/* <p id="resultTot" className="outcome">The result is : {result}</p> */}
          <button className="send" onClick={props.goback}>Go Back</button>
      </div>
    );
  };
  
  export default Result;