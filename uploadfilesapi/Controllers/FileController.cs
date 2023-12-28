using Microsoft.AspNetCore.Mvc;

namespace uploadfilesapi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileController : ControllerBase
{

    [HttpPost("uploadbinaryfile")]
    public async Task<IActionResult> UploadFileBinaryAsync() {
        var inputStream = Request.Body;
        var fileName = Guid.NewGuid().ToString();
        var filePath = $"uploads/{fileName}.csv";
        using var stream = System.IO.File.OpenWrite(filePath);
        await inputStream.CopyToAsync(stream);

        return Ok(new { message = "File uploaded successfully"});
    }

}
