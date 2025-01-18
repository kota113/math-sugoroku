import {Block, PathWay, Problem} from "./types.ts";

function getPathways(blocks: Block[]): PathWay[] {
  const pathways: PathWay[] = []
  let pathway: PathWay = {
    startBlockId: 85,
    endBlockId: 85,
    direction: 'horizontal',
    operation: 'increment',
    length: 1
  }
  blocks.forEach((block, index) => {
    const nextBlock = blocks[index + 1]
    if (!nextBlock) {
      pathways.push(pathway)
      return
    }
    let predictedNextBlockId: number
    if (pathway.direction === 'horizontal') {
      if (pathway.operation == 'increment') {
        predictedNextBlockId = pathway.endBlockId + 1
      } else {
        predictedNextBlockId = pathway.endBlockId - 1
      }
    } else {
      if (pathway.operation == 'increment') {
        predictedNextBlockId = pathway.endBlockId + 12
      } else {
        predictedNextBlockId = pathway.endBlockId - 12
      }
    }
    if (nextBlock.id == predictedNextBlockId) {
      pathway.length += 1
      pathway.endBlockId = nextBlock.id
    } else {
      pathways.push(pathway)
      if (block.id + 1 === nextBlock?.id) {
        pathway = {
          startBlockId: block.id,
          length: 2,
          endBlockId: block.id + 1,
          direction: 'horizontal',
          operation: "increment"
        }
      } else if (block.id - 1 === nextBlock?.id) {
        pathway = {
          startBlockId: block.id,
          length: 2,
          endBlockId: block.id - 1,
          direction: 'horizontal',
          operation: "decrement"
        }
      } else if (block.id + 12 === nextBlock?.id) {
        pathway = {
          startBlockId: block.id,
          length: 2,
          endBlockId: block.id + 12,
          direction: 'vertical',
          operation: "increment"
        }
      } else if (block.id - 12 === nextBlock?.id) {
        pathway = {
          startBlockId: block.id,
          length: 2,
          endBlockId: block.id - 12,
          direction: 'vertical',
          operation: "decrement"
        }
      }
    }
  })
  return pathways
}

export class GameManager {
  public pathways: PathWay[]
  public blocks: Block[]
  public problems: Problem[]
  public currentPlayerId: number
  public playersPositions: { [key: number]: number }

  constructor(blocks: Block[], problems: Problem[], playerCount: number) {
    this.blocks = blocks
    this.pathways = getPathways(blocks)
    this.problems = problems
    this.currentPlayerId = 0
    this.playersPositions = {
      0: 0,
      ...[...Array(playerCount - 1)].reduce((acc, _, index) => {
        acc[index + 1] = 0
        return acc
      }, {})
    }
  }

  getRandomProblems(count: number, level: number) {
    const levelStr = level === 1? 'normal': level === 2? 'hard': 'easy'
    console.log(levelStr)
    const filteredProblems = this.problems.filter((problem) => problem.level == levelStr)
    return [...Array(count)].map(() => {
      const randomIndex = Math.floor(Math.random() * filteredProblems.length)
      return filteredProblems[randomIndex]
    })
  }

  switchPlayer() {
    this.currentPlayerId = (this.currentPlayerId + 1) % Object.keys(this.playersPositions).length
  }

  movePlayer(steps: number) {
    this.playersPositions[this.currentPlayerId] += steps
  }
}
