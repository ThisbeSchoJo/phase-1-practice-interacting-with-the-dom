// See the timer increment every second once the page has loaded.
let count = 0
let counterElement = document.getElementById("counter")

function updateCounter() {
    count ++
    counterElement.innerText = count
}

let intervalId = setInterval(updateCounter, 1000)
let isPaused = false //track the paused state

// Manually increment and decrement the counter using the plus and minus buttons.
const plusButton = document.getElementById("plus")
plusButton.addEventListener('click', () => {
    count ++
})
const minusButton = document.getElementById("minus")
minusButton.addEventListener('click', () => {
    count --
})

// "Like" an individual number of the counter. I should see the count of the number of "likes" associated with that number displayed.
const likeButton = document.getElementById("heart")
likeButton.addEventListener('click', () => {
    const likesLoggingArea = document.querySelector(".likes")
    let existingLi = likesLoggingArea.querySelector(`li[data-num="${count}"]`)
    
    if (existingLi) { //checks if there is already an <li> for that count value
        //Increment the like count for an exisitng number
        let span = existingLi.querySelector("span")
        let likeCount = parseInt(span.textContent)
        span.textContent = likeCount + 1
    } else {
        //Add a new entry for the current count
        const liElement = document.createElement("li")
        liElement.setAttribute("data-num", count)
        liElement.innerHTML = `${count} has been liked <span> 1 </span> time </li>`
        likesLoggingArea.appendChild(liElement)
    }
})
// Pause the counter, which should:
// pause the counter
// disable all the buttons (other than pause)
// switch the label on the button from "pause" to "resume"
// Click the "resume" button to restart the counter and re-enable the buttons.
const pauseButton = document.getElementById("pause")
pauseButton.addEventListener('click', () => {
    if (!isPaused) {
        //Pause the counter
        clearInterval(intervalId)

        //Disable the other buttons
        plusButton.disabled = true
        minusButton.disabled = true
        likeButton.disabled = true

        //Update the paused state
        isPaused = true
        pauseButton.textContent = "resume"
    } else {
        //Resume the counter
        intervalId = setInterval(updateCounter, 1000)

        //Enable the other buttons
        plusButton.disabled = false
        minusButton.disabled = false
        likeButton.disabled = false

        //Update the paused state
        isPaused = false
        pauseButton.textContent = "pause"
    }  
})

// Leave comments on my gameplay, such as: "Wow, what a fun game this is."
const commentForm = document.getElementById("comment-form")
commentForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const commentElement = document.getElementById("comment-input")
    const comment = document.createElement("p")
    comment.textContent = commentElement.value
    const commentSection = document.getElementById("list")
    commentSection.appendChild(comment)
    commentForm.reset()
})