export const dateUtil = (dateString)=>{
    const date = new Date(dateString);

    const numericalDate = {
      day: date.getDate(),
      month: date.getMonth() + 1, // Month is zero-based, so we add 1
      year: date.getFullYear()
    };
    let appDate = `${numericalDate.day}/${numericalDate.month}/${numericalDate.year}`
    return {
        numericalDate,appDate
    }
}