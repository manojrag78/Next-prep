'use client'

const Interactivebutton = () => {
    const onClicked = () => {
        window.alert('button clicked')
    }
  return (
    <div>
      <button onClick={onClicked}>Click Here</button>
    </div>
  )
}

export default Interactivebutton
