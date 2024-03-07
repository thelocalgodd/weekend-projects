const rockPaperScissors = () => {
    let option = document.getElementById("input-box").value.toLowerCase();
    let userOption = document.getElementById("userOption");
    let computerOption = document.getElementById("computerOption");
    let result = document.getElementById("result");
    
    if (option === "rock") {
        userOption.innerHTML = "🪨";
    } else if (option === "paper") {
        userOption.innerHTML = "🗞️";
    } else {
        userOption.innerHTML = "✂️"
    }

    const options = ["rock", "paper", "scissors"];
    const randOption = options[Math.floor(Math.random() * options.length)];

    if (randOption === "rock") {
        computerOption.innerHTML = "🪨";
    } else if (randOption === "paper") {
        computerOption.innerHTML = "🗞️";
    } else {
        computerOption.innerHTML = "✂️"
    }
    

    if (option === randOption) {
        console.log("It's a tie!");
        result.innerHTML = "It's a tie!";
    } else if (
        (option === "rock" && randOption === "scissors") ||
        (option === "paper" && randOption === "rock") ||
        (option === "scissors" && randOption === "paper")
    ) {
        console.log("You win!");
        result.innerHTML = "You win!"
    } else {
        console.log("Computer wins!");
        result.innerHTML = "Computer wins!";
    }
}

document.getElementById("submit-button").addEventListener("click", () => {
    rockPaperScissors();
});