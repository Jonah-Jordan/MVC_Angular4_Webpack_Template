using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MvcAngularTemplate.Startup))]
namespace MvcAngularTemplate
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
