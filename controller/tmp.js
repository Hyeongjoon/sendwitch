var async = require('async');

async.seriese([
                 function(callback) {
                   console.log('--- async.waterfall #1 ---');
                   // 여기서도 series, parallel과 마찬가지로
                   // callback의 실행은 다음 task 으로 넘기기 위한것입니다.
                   //
                   // parallel의 다른점은
                   // callback의 결과가 다음 task으로 전달되는 점입니다.
                   callback(null, 'one', 'two');
                 },
                 // 첫번째 task에서 전달된 one, two 값을 인자로 받게 됩니다.
                 function(arg1, arg2, callback) {
                   console.log('--- async.waterfall #2 ---');
                   console.log(arguments);
                   callback(null, arg1, arg2);
                 }
               ],
               // 마지막 함수에서 callback으로 전달한 인자가 넘어옵니다.
               function(err, results) {
                 console.log('--- async.waterfall result #1 ---');
                 console.log(arguments);
               });