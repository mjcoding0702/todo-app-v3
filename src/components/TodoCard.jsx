import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";


export default function TodoCard( { todo }) {
    const completed = todo.completed;
    const border = completed ? "success" : "danger";
    const [timer, setTimer] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);

    // Functinos related to the timer
    const startTimer = () => {
      if (timerInterval === null) {
        const intervalID = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        setTimerInterval(intervalID);
      }
    }

    const pauseTimer = () => {
      clearInterval(timerInterval);
    }

    const resetTimer = () => {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setTimer(0);
    }

    useEffect(() => {
      return () => {
        clearInterval(timerInterval);
      }
    }, [timerInterval])

    return (
      <Card border={border} className="my-3">
          <Card.Header>{!completed && "Not"} Completed</Card.Header>
          <Card.Body>
            <Card.Title>{todo.title}</Card.Title>
            <Card.Text>{todo.description}</Card.Text>
            <p>Timer: {timer} seconds</p>
            <Button onClick={startTimer}>
              <i className="bi bi-play"></i>
            </Button>
            <Button onClick={pauseTimer} className="mx-2">
              <i className="bi bi-pause-fill"></i>
            </Button>
            <Button onClick={resetTimer} className="ms-2">
              <i className="bi bi-arrow-clockwise"></i>
            </Button>
          </Card.Body>
      </Card>
    )
}