export const useTimeStampToDate = () => {
  const calcDate = (timeStamp: number = 600) => {

    timeStamp = Math.abs(timeStamp);
    
    
    // const year = Math.round(timeStamp / 365);
    // const month = Math.round((timeStamp % 365) / 30);
    // const day = Math.round((timeStamp % 365) % 30);
    // const data = ` ${year > 1 ? year + "سنه" : ""} ${
    //   month > 1 ? month + "شهر" : ""
    // } ${day >= 1 ? day + "يوم" : ""} `;
   
    const data=`${Math.round(timeStamp)>0 ? Math.round(timeStamp)+'يوم': "اليوم" }`
  
    return data;
  };
  return { calcDate };
};
