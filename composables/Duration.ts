export const useDuration = () => {
  const  getAllDurations =(targetDateString: string): string => {
    const targetDate = new Date(targetDateString);
    const now = new Date();
  
    const diffInMs = targetDate.getTime() - now.getTime();
    const diffInDays = Math.abs(Math.floor(diffInMs / (1000 * 60 * 60 * 24)));
    const diffInMonths = Math.abs(Math.floor(diffInDays / 30));
    const diffInYears = Math.abs(Math.floor(diffInMonths / 12));
  
    const remainingMonths = diffInMonths % 12;
    const remainingDays = diffInDays % 30;
  
    const parts = [];
  
    if (diffInYears > 0) {
      parts.push(diffInYears === 1 ? "1 سنة" : `${diffInYears} سنين`);
    }
    if (remainingMonths > 0) {
      parts.push(remainingMonths === 1 ? "1 شهر" : `${remainingMonths} شهور`);
    }
    if (remainingDays > 0) {
      parts.push(remainingDays === 1 ? "1 يوم" : `${remainingDays} ايام`);
    }
  
    return parts.length > 0 ? parts.join(", ")  : "الان";
  }
  return {getAllDurations }
}
