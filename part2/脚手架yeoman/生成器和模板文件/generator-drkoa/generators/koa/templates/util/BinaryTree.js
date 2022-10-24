function BinaryTree(speech_duration) {
    function Node(key, value) {
        this.key = key
        this.value = value
        this.left = null
        this.right = null
    }
    this.root = null
    this.speech_duration = speech_duration
    var insertNode = function(node, newNode) {
        if(newNode.key < node.key) {
            if(node.left === null) {
                node.left = newNode
            } else {
                insertNode(node.left, newNode)
            }
        } else {
            if(node.right === null) {
                node.right = newNode
            } else {
                insertNode(node.right, newNode)
            }
        }
    }
    this.insert = function(key, value) {
        var self = this
        var newNode = new Node(key, value)
        if(self.root === null) {
            self.root = newNode
        } else {
            insertNode(self.root, newNode)
        }
    }
    this._inOrderTraverseNode = function(node, callback) {
        if(node !== null) {
            this._inOrderTraverseNode(node.left, callback)
            callback(node.key, node.value, this.speech_duration)
            this._inOrderTraverseNode(node.right, callback)
        }
    }
    this.inOrderTraverseNode = function(callback) {
        this._inOrderTraverseNode(this.root, callback)
    }
}

module.exports = BinaryTree