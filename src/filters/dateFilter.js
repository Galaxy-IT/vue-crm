export default function dateFilter(value, format = 'date'){
  
  const options ={}
  if(format.includes('date')){
    options.day='2-digit'
    options.month ='long'
    options.year ='numeric'
  }
  if(format.includes('time')){
    options.hour='2-digit'
    options.minute ='2-digit'
    options.second ='2-digit'
  }
  if(format.includes('date-time')){
    options.day=''
    options.month =''
    options.year =''

    options.second=''
    options.minutes =''
    options.hours =''
  }
  return new Intl.DateTimeFormat('ru-RU',options).format(new Date(value))
  
}