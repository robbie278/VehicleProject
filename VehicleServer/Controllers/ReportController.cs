﻿using Microsoft.AspNetCore.Mvc;
using VehicleServer.DTOs;
using VehicleServer.Entities;
using VehicleServer.Repository;

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly reportRepo _repository;

    public ReportController(reportRepo repository)
    {
        _repository = repository;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Stock>> GetStock(int id)
    {
        var stock = await _repository.GetStockById(id);

        if (stock == null)
        {
            return NotFound();
        }

        return stock;
    }

    [HttpGet("total-quantity-by-store")]
    public async Task<ActionResult<List<StockDto>>> GetAllStocks()
    {
        return await _repository.GetTotalQuantityByStore();
    }

    // Add an endpoint to get the total quantity of each item in stock
    [HttpGet("total-quantity-by-item")]
    public async Task<ActionResult<List<StockDto>>> GetTotalQuantityByItem()
    {
        return await _repository.GetTotalQuantityByItem();
    }

    // Add other necessary endpoints as needed
}
