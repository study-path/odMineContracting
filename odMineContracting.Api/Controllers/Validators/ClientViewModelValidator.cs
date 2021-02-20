using FluentValidation;
using odMineContracting.Api.Controllers.ViewModels;

namespace odMineContracting.Api.Controllers.Validators
{
    public sealed class ClientViewModelValidator : AbstractValidator<ClientViewModel>
    {
        public ClientViewModelValidator()
        {
            this.RuleFor(p => p.ContactPhone).NotEmpty().Matches(@"^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$");// " ^ (\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$");
            this.RuleFor(p => p.ContactEmail).EmailAddress();
        }
    }
}
