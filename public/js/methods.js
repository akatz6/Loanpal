//Set up arrays to display data
function setDataForDisplay(array){
  const data = [];
  let count = 30;
  for (let i = 2; i < 7; i++) {
      const number = array.filter(element => {
          return element.dayspastdue > count * (i - 1) &&
              element.dayspastdue < count * (i)
      })
      data.push({
          days: count * (i - 1),
          count: number
      })
  }
  return data;
}

//Reset to data for the United States
function reset() {
    service.forEach((item, i) => {
        item.dayspastdue = +item.dayspastdue;
        item.pastdueamt = +item.pastdueamt;
    });

    deliquency = service.filter(element => {
        return element.dayspastdue > 30;
    })
    const data = setDataForDisplay(deliquency);
    update(data);
}


//Get a list of states with deliquent customers
function getStateDataForBarGraph(state){
  const stateLoans = loans.filter(element => {
    if(element.state === state){
      return element;
    }
  });
  const idsForState = stateLoans.map(element => element.loanid)
  const inState = service.filter((item) => {
      if(idsForState.find(element => element === item.loanid)){
        return item
      }
  });
  const deliquentCus = inState.filter((item) => {
      if(item.dayspastdue > 30){
        return item
      }
  });
  const data =  setDataForDisplay(deliquentCus);
  update(data, state, inState.length);
}
