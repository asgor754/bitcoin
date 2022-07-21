import Blockchain from './index.js'
import express from 'express'
const bitcoin = new Blockchain()
import { v4 as uuidv4} from 'uuid'
import bodyParser from 'body-parser'


const nodeAddress = uuidv4().split('-').join('')
const app = express()

const port = 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/blockchain', (req, res) => {
    res.send(bitcoin)
  })
  
  app.get('/demo', (req, res) => {
    res.send('this is demo World!')
  })
  app.post('/transaction',function(req, res){
   const newtransac = bitcoin.createNewTransaction(req.body.amount, req.body.sender,req.body.receipient)
   res.json(`this will make transaction ${newtransac}`)
  })
  // mine  a block 
  app.get('/mine',function(req, res){
    const lastBlock = bitcoin.getLastBlock()
    const preBlockHash = lastBlock['hash']


    const currentBlockData = {
        transaction : bitcoin.pendingTransactions,
        index :lastBlock['index'] + 1

    }
   
    // craete a nonce
    const nonce = bitcoin.proofofWork(preBlockHash, currentBlockData)
   // block hash
   const blockHash = bitcoin.hashBlock(preBlockHash,currentBlockData,nonce)
   bitcoin.createNewTransaction(10,'0000',nodeAddress)
   const newblock = bitcoin.createNewBlock(nonce,preBlockHash,blockHash)
    
   res.json({
    note: 'new block has been created',
    block : newblock
   })
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})