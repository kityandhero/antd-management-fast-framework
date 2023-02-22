import { Forbidden } from './Forbidden';
import { Info } from './Info';
import { LocalError } from './LocalError';
import { NotFound } from './NotFound';
import { ServerError } from './ServerError';
import { Success } from './Success';
import { Warn } from './Warn';

const Result = {
  Forbidden,
  Info,
  LocalError,
  NotFound,
  ServerError,
  Success,
  Warn: Warn,
};

export { Result };
