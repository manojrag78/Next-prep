'use client'

const Interactivebutton = () => {
        console.log('📦 Server-side render: /button');

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
