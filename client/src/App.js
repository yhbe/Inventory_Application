import React from 'react'

function App() {
  const [backendData, setBackendData] = React.useState(undefined)

  React.useEffect(() => {
    fetch("/api")
    .then(res => res.json())
    .then(data => setBackendData(data))
    .catch((err) => console.log(err))
  },[])

  function createUsers(){
    let jsx = backendData.users.map(user => (<p>Hello {user}</p>))
    return jsx
  }
  return (
    <>
    <div>App</div>
    {backendData && createUsers()}
    </>
  )
}

export default App