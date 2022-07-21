import sha256 from "sha256";

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  // genesis block 
  this.createNewBlock(754,'0','0')
}
// new block function
Blockchain.prototype.createNewBlock = function (nonce, prevHash, hash) {
  // new block
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now().toString(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    prevHash: prevHash,
    hash: hash,
  };
  this.pendingTransactions = [];
  this.chain.push(newBlock);
  return newBlock;
};


// getting last block from chain 
Blockchain.prototype.getLastBlock = function(){
   return this.chain[this.chain.length - 1]
}


// new transaction method
Blockchain.prototype.createNewTransaction = function(amount ,sender , receipient){
   const newTransaction = {
        amount : amount,
        sender : sender,
        receipient : receipient
   }
   this.pendingTransactions.push(newTransaction)
   
   return this.getLastBlock()['index'] +1
}

// sha256 hashing algorithom 
Blockchain.prototype.hashBlock = function(preBlockHash, currentBlockData, nonce){
  // code goes here
  const dataAsString = preBlockHash + nonce.toString() + JSON.stringify(currentBlockData)
  const hash = sha256(dataAsString)
  return hash
}


// proof of work 

Blockchain.prototype.proofofWork = function(preBlockHash, currentBlockData){
  // method goes here

  let nonce = 0;
  let hash = this.hashBlock(preBlockHash,currentBlockData ,nonce)

  while(hash.substring(0,4)!== '0000'){
    nonce++
    hash = this.hashBlock(preBlockHash,currentBlockData,nonce)
  
  }
  return nonce
}

export default Blockchain;