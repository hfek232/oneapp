window.onerror = function(message, source, lineno, colno, error) {
  const msg = `ERROR: ${message} \nAt: ${source}:${lineno}:${colno}`;
  console.error(msg);
  document.body.innerHTML = `<div style="padding:20px;color:white;background:red;font-family:monospace;z-index:9999;position:fixed;top:0;left:0;width:100%;height:100%;overflow:auto;"><h1>App Crashed</h1><pre>${msg}\n\n${error?.stack}</pre></div>`;
  return false;
};

window.onunhandledrejection = function(event) {
  const msg = `PROMISE ERROR: ${event.reason}`;
  console.error(msg);
  document.body.innerHTML = `<div style="padding:20px;color:white;background:orange;font-family:monospace;z-index:9999;position:fixed;top:0;left:0;width:100%;height:100%;overflow:auto;"><h1>Async Crash</h1><pre>${msg}</pre></div>`;
};
