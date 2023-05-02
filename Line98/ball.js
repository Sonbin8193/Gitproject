class Ball {
    constructor (status) 
    {
        this.color = 0;
        this.status = status;
    }
    setColorBall(){
        let numberColor = Math.floor(Math.random()*7)+1;
        switch (numberColor) {
            case 1:
                this.color = 'red';
                break;
            case 2:
                this.color = 'blue';
                break;
            case 3:
                this.color = 'yellow';
                break;
            case 4:
                this.color = 'pink';
                break;
            case 5:
                this.color = 'green';
                break;
            case 6:
                this.color = 'aqua';
                break;
        }
        return this.color;
    }

    getStatusBall(statusBall) {
        switch (statusBall) {
            case '-1':
                this.status = 'no ball';
                break;
            case '0':
                this.status = 'hide';
                break;
            case '1':
                this.status = 'appear';
                break;
            case '2':
                this.status = 'choseBall';
                break;
            case '3':
                this.status = 'ready to move';
                break;
            case '4':
                this.status = 'next turn';
                break;
        }
        return this.status;
    }
}

newBall = new Ball(1);
newBall.setColorBall();