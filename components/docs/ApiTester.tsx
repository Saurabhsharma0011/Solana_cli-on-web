import React, { useState } from 'react';
import { Send, ChevronDown, ChevronUp, Copy } from 'lucide-react';

type HttpMethod = 'GET' | 'POST';

interface ApiResponse {
  data: Record<string, unknown>;
  status: number;
  time: number;
}

const ApiTester: React.FC = () => {
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [url, setUrl] = useState<string>('/api/hello');
  const [requestBody, setRequestBody] = useState<string>('{\n  "message": "Hello from Nex4"\n}');
  const [requestHeaders, setRequestHeaders] = useState<string>('{\n  "Content-Type": "application/json"\n}');
  const [showRequestBody, setShowRequestBody] = useState(true);
  const [showRequestHeaders, setShowRequestHeaders] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const installCommand = 'npm i nex4';

  const handleMethodChange = (newMethod: HttpMethod) => {
    setMethod(newMethod);
    if (newMethod === 'GET' && showRequestBody) {
      setShowRequestBody(false);
    } else if (newMethod === 'POST' && !showRequestBody) {
      setShowRequestBody(true);
    }
  };

  const handleSendRequest = async () => {
    setLoading(true);
    setResponse(null);
    
    try {
      const startTime = performance.now();
      
      // Parse headers
      let headersObj = {};
      try {
        headersObj = JSON.parse(requestHeaders);
      } catch {
        throw new Error('Invalid JSON in request headers');
      }
      
      // Prepare request options
      const options: RequestInit = {
        method,
        headers: headersObj as HeadersInit,
      };
      
      // Add body for POST requests
      if (method === 'POST' && requestBody.trim()) {
        try {
          const bodyObj = JSON.parse(requestBody);
          options.body = JSON.stringify(bodyObj);
        } catch {
          throw new Error('Invalid JSON in request body');
        }
      }
      
      // Send request
      const res = await fetch(url, options);
      const endTime = performance.now();
      
      // Parse response
      let data;
      try {
        data = await res.json();
      } catch {
        data = { message: 'Response is not valid JSON' };
      }
      
      setResponse({
        data,
        status: res.status,
        time: Math.round(endTime - startTime)
      });
    } catch (error) {
      setResponse({
        data: { error: error instanceof Error ? error.message : 'Unknown error occurred' },
        status: 0,
        time: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const copyResponseToClipboard = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
    }
  };

  const copyInstallCommand = () => {
    navigator.clipboard.writeText(installCommand);
  };

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">API Route Tester</h2>
      <p className="text-gray-300 mb-6">
        Test API routes with different HTTP methods and view the responses in real-time.
      </p>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Install npm modules</h3>
        <div className="bg-[#0B1120] border border-[#334155] rounded-md px-3 py-3 flex items-center justify-between">
          <span className="text-gray-300 font-mono text-sm">$ {installCommand}</span>
          <button
            onClick={copyInstallCommand}
            className="text-gray-400 hover:text-white"
            title="Copy install command"
          >
            <Copy size={14} />
          </button>
        </div>
        <p className="text-gray-300 mt-3 text-sm">
          Install our npm module directly into your compiler/terminal to get started quickly.
        </p>
      </div>

      {/* Request Builder */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex bg-[#0F172A] rounded-md overflow-hidden">
            <button 
              className={`px-4 py-2 text-sm font-medium ${method === 'GET' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-[#1E293B]'}`}
              onClick={() => handleMethodChange('GET')}
            >
              GET
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${method === 'POST' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-[#1E293B]'}`}
              onClick={() => handleMethodChange('POST')}
            >
              POST
            </button>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="API route path (e.g. /api/hello)"
            className="flex-1 bg-[#0F172A] border border-[#334155] rounded-md px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <button
            onClick={handleSendRequest}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : (
              <>
                <Send size={14} className="mr-2" />
                Send
              </>
            )}
          </button>
        </div>

        {/* Request Headers */}
        <div className="mb-4">
          <button
            onClick={() => setShowRequestHeaders(!showRequestHeaders)}
            className="flex items-center w-full justify-between bg-[#0F172A] border border-[#334155] rounded-md px-3 py-2 text-gray-300 mb-2"
          >
            <span className="font-medium">Headers</span>
            {showRequestHeaders ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showRequestHeaders && (
            <textarea
              value={requestHeaders}
              onChange={(e) => setRequestHeaders(e.target.value)}
              className="w-full bg-[#0B1120] border border-[#334155] rounded-md px-3 py-2 text-gray-300 font-mono text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          )}
        </div>

        {/* Request Body */}
        {method === 'POST' && (
          <div>
            <button
              onClick={() => setShowRequestBody(!showRequestBody)}
              className="flex items-center w-full justify-between bg-[#0F172A] border border-[#334155] rounded-md px-3 py-2 text-gray-300 mb-2"
            >
              <span className="font-medium">Request Body</span>
              {showRequestBody ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showRequestBody && (
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full bg-[#0B1120] border border-[#334155] rounded-md px-3 py-2 text-gray-300 font-mono text-sm min-h-[150px] focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            )}
          </div>
        )}
      </div>

      {/* Response */}
      <div>
        <h3 className="font-medium mb-2">Response</h3>
        <div className="bg-[#0B1120] border border-[#334155] rounded-md p-4">
          {response ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium 
                    ${response.status >= 200 && response.status < 300 ? 'bg-green-500/20 text-green-400' : 
                    response.status >= 400 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}
                  >
                    Status: {response.status}
                  </div>
                  <div className="text-xs text-gray-400">
                    Time: {response.time}ms
                  </div>
                </div>
                <button
                  onClick={copyResponseToClipboard}
                  className="text-gray-400 hover:text-white"
                  title="Copy response"
                >
                  <Copy size={14} />
                </button>
              </div>
              <pre className="text-gray-300 font-mono text-sm overflow-auto max-h-[300px]">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </>
          ) : (
            <div className="text-gray-500 italic text-sm">
              {loading ? 'Sending request...' : 'Send a request to see the response'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
