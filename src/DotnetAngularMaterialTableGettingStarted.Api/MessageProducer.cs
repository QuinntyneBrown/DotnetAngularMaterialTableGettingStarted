// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System.Text.Json;
using Microsoft.AspNetCore.SignalR;

namespace DotnetAngularMaterialTableGettingStarted.Api;

public class MessageProducer: BackgroundService
{
    private readonly ILogger<MessageProducer> _logger;

    private readonly IHubContext<DotnetAngularMaterialTableGettingStartedHub,IDotnetAngularMaterialTableGettingStartedHub> _hubContext;

    public MessageProducer(ILogger<MessageProducer> logger,IHubContext<DotnetAngularMaterialTableGettingStartedHub,IDotnetAngularMaterialTableGettingStartedHub> hubContext){
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

            var message = new Message();

            var json = JsonSerializer.Serialize(message);

            await _hubContext.Clients.All.Packet(json);

            await Task.Delay(1000, stoppingToken);
        }

    }

}


