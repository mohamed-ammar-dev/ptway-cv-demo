import { Container } from "inversify";
import { DI_TYPES } from "../shared/types/di";
import { CvTemplatesRepo } from "../cv-module/adapters/database/repository/cvTemplatesRepo";
import { CvCoreService } from "../cv-module/domain/core/cvCoreService";
import { ICvCoreService } from "../cv-module/interfaces/ICvCoreService";
import { ICvTemplatesRepo } from "../cv-module/domain/ports/ICvTemplateRepo";

const diContainer = new Container();

diContainer.bind<ICvCoreService>(DI_TYPES.CvCoreService).to(CvCoreService);

diContainer
  .bind<ICvTemplatesRepo>(DI_TYPES.CvTemplateRepo)
  .to(CvTemplatesRepo)
  .inSingletonScope();

export { diContainer };
