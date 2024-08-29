using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using TasksAPI.Models;
using TasksAPI.Services;

namespace TasksAPI.Controllers
{
    /// <summary>
    /// Controller for tasks.
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        ITaskCollectionService _taskCollectionService;

        /// <summary>
        /// Constructor.
        /// </summary>
        public TaskController(ITaskCollectionService taskCollectionService)
        {
            _taskCollectionService = taskCollectionService ?? throw new ArgumentNullException(nameof(TaskCollectionService));
        }


        /// <summary>
        /// Returns the list of tasks.
        /// </summary>
        /// <returns>List of tasks.</returns>
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            List<TaskModel> tasks = await _taskCollectionService.GetAll();
            return Ok(tasks);
        }

        /// <summary>
        /// Returns the list of tasks with the specified status.
        /// </summary>
        /// <param name="status"></param>
        /// <returns>List of tasks with specified status.</returns>
        [HttpGet("{status}")]
        public async Task<IActionResult> GetTasks(string status)
        {
            List<TaskModel> tasks = await _taskCollectionService.GetTasksByStatus(status);
            return Ok(tasks);
        }

        /// <summary>
        /// Creates the task provided in body.
        /// </summary>
        /// <param name="task"></param>
        /// <returns>200 if the task was created, 400 if the task in body was null, 422 if the task couldn't be created.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateTaskAsync([FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null.");
            }
            bool result = await _taskCollectionService.Create(task);
            if (result)
                return Ok("Task has been created.");
            else
                return UnprocessableEntity("Task couldn't be created: A task with title already exists.");
        }

        /// <summary>
        /// Modifies a task with the information of the task in body. This task must have an id already in the list of tasks.
        /// </summary>
        /// <param name="task"></param>
        /// <returns>200 if the task was modified, 400 if the task in body was null, 404 if the task was not found.</returns>
        [HttpPut("{taskId}")]
        public async Task<ActionResult> ModifyTask(Guid taskId, [FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null.");
            }

            bool foundTask = await _taskCollectionService.Update(taskId, task);
            if (!foundTask)
                return NotFound("Task not found.");

            return Ok("Task has been modified.");
        }

        /// <summary>
        /// Deletes a task with the id provided in query.
        /// </summary>
        /// <param name="taskId"></param>
        /// <returns>200 if the task was deleted, 404 if the task was not found.</returns>
        [HttpDelete("{taskId}")]
        public async Task<ActionResult> DeleteTask(Guid taskId)
        {
            bool deleted = await _taskCollectionService.Delete(taskId);
            if (!deleted)
            {
                return NotFound("Task not found. / Task couldn't be deleted.");
            }
            return Ok("Task has been deleted.");
        }
    }
}
