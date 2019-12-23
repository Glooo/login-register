import axios from 'axios'

function request (Obj) {
  console.log(Obj)
  if (Obj.method.toLowerCase() === 'get') {
    axios.get(Obj.url, Obj.params).then(
      res => {
        return res
      }).catch((err) => {
      return err
    })
  } else if (Obj.method.toLowerCase() === 'post') {
    axios.post(Obj.url, Obj.params).then(
      res => {
        return res
      }).catch((err) => {
      return err
    })
  } else {
    return false
  }
}
export default request
