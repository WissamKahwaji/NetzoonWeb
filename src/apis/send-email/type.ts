export type SendEmailInputModel = {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: TemplateParams;
};

export type TemplateParams = {
  user_name: string;
  user_email: string;
  user_subject: string;
  user_message: string;
};
