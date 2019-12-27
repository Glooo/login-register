import axios from 'axios'

async function request (Obj) {
  console.log(Obj)
  if (Obj.method.toLowerCase() === 'get') {
    await axios.get(Obj.url, Obj.params).then(
      res => {
        return res
      }).catch((err) => {
      return err
    })
  } else if (Obj.method.toLowerCase() === 'post') {
    await axios.post(Obj.url, Obj.params).then(
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
