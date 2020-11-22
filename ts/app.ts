const field: HTMLElement | null = document.querySelector('.field');
const winWrap: HTMLElement | null = document.querySelector('.win-wrap');
const restartButton: HTMLElement | null = document.querySelector('.restart');
const cellSize = 100;

const empty = {
    value: '16',
    left: 0,
    top: 0,
    element: document.createElement('div')
}

let cells: any[] = [];
cells.push(empty);

function move(index: number): void {
    const cell: {value: string, left: number, top: number, element: HTMLElement} = cells[index];
    const leftDiff = Math.abs(empty.left - cell.left);
    const topDiff = Math.abs(empty.top - cell.top);

    if (leftDiff + topDiff > 1) {
        return
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
}

function isFinished(): void {
    const isFinished = cells.every((cell) => {
        return cell.value === (cell.top * 4 + cell.left + 1).toString();
    })

    if (isFinished) {
        const winText: HTMLElement = document.createElement('div');
        winText.className = 'winText';
        winText.innerHTML = 'You won!';
        winWrap!.appendChild(winText);
    }
}

const numbers = [...Array(15).keys()]
    .sort(() => Math.random() - 0.5)

for (let i = 1; i <= 15; i++) {
    const value = `${numbers[i - 1] + 1}`;
    const cell: HTMLElement = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = value;

    const left = i % 4;
    const top = (i - left)/4;

    cells.push({
        value: value,
        left: left,
        top: top,
        element: cell
    })

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    field!.appendChild(cell);

    cell.addEventListener('click', () => {
        move(i);
        isFinished();
    });
}

restartButton!.addEventListener('click', () => {
    document.location.reload();
});
