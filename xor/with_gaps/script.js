// try different logic gates as training data
const training_data = {
  x: [
    [1, 1],
    [0, 1],
    [1, 0],
    [0, 0]
  ],
  y: [
    [0],
    [1],
    [1],
    [0]
  ]
}
const xs = tf.tensor2d(training_data.x);
const ys = tf.tensor2d(training_data.y);
const model = tf.sequential();

function build_model() {
  //  || WRITE YOUR CODE HERE ||  //
  // dont return anything
  // add layers to the "model" object and then compile it
  // experiment with different amounts of layers, neurons,
  // activation functions, optimizers and loss functions
}
function train() {
  //  || WRITE YOUR CODE HERE ||  //
  // return a promise for fitting the "xs" to "ys"
  // experiment with training parameters
  // tip: model.fit returns a promise
}
function predict(x) {
  //  || WRITE YOUR CODE HERE ||  //
  // return models predictions for "x"
  // tips:
  // 1. turn x into tensor before feeding it to the network
  // 2. return only values not the tensor (dataSync function)
  // 3. dont forget to tidy :)
}

function update_loss_label(loss){
  let rounded_loss = Math.round(loss*100)/100;
  document.getElementById('loss').innerHTML = 'loss: ' + rounded_loss;
}
async function training_loop(){
  const data = await train();
  const loss = data.history.loss[0];
  update_loss_label(loss);
  setTimeout(training_loop, 1000/30);
}

const canvas_size = 500;
const block_size = 50;
const number_of_blocks = canvas_size / block_size;
let data_for_prediction = [];

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent('canvas_div');
  strokeWeight(3);
  stroke(255);
  textSize(Math.round(block_size/4));
  textAlign(CENTER, CENTER);
  textFont('Georgia')
  for (let i = 0; i < number_of_blocks; i++)
    for (let j = 0; j < number_of_blocks; j++)
      data_for_prediction.push([i / number_of_blocks, j / number_of_blocks]);
  build_model();
  training_loop();
}

function draw() {
  background(220, 220, 255);
  let predictions = predict(data_for_prediction);
  index=0;
  for (let i = 0; i < number_of_blocks; i++) {
    for (let j = 0; j < number_of_blocks; j++) {
      fill(predictions[index]*255, predictions[index]*255, 255);
      stroke(255);
      rect(i * block_size, j * block_size, block_size, block_size);
      fill(255, 165, 0);
      noStroke();
      let rounded_prediction = Math.round(predictions[index]*100)/100
      text(rounded_prediction, i * block_size, j * block_size, block_size, block_size)
      index++;
    }
  }
}
