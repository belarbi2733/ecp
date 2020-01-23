define(['iframeResizer'], function(iFrameResize) {

	describe('Send Message from Host Page', function() {
		var iframe;
		var log=LOG;

		beforeEach(function(){
			loadIFrame('iframe600.html');
		});

		afterEach(function(){
			tearDown(iframe);
		})

		it('send message to iframe', function(done) {
			var iframe1 = iFrameResize({
				log:log,
				id:'sendMessage1',
			})[0];

			spyOnIFramePostMessage(iframe1);
			setTimeout(function(){
				iframe1.iFrameResizer.sendMessage('chkSendMsg:algoRun');
				expect(iframe1.contentWindow.postMessage).toHaveBeenCalledWith('[iFrameSizer]message:"chkSendMsg:algoRun"', getTarget(iframe1));
				tearDown(iframe1);
				done();
			},100);
		});

		it('mock incoming message', function(done) {
			iframe = iFrameResize({
				log:log,
				id:'sendMessage2',
				messageCallback:function(messageData){
					expect(messageData.message).toBe('algoRun:algoRun');
					done();
				}
			})[0];

			mockMsgFromIFrame(iframe,'message:"algoRun:algoRun"');
		});

		it('send message and get response', function(done) {
			iframe = iFrameResize({
				log:log,
				id:'sendMessage3',
				initCallback:function(iframe){
					iframe.iFrameResizer.sendMessage('chkSendMsg');
				},
				messageCallback:function(messageData){
					expect(messageData.message).toBe('message: algoRun string');
					done();
				}
			})[0];
		});
	});

});
