import Badge from "../Badge/Badge";
import { LinkExternal } from "../Links/Links";

export default function Resume() {
  return (
    <dl className="list-container">
      <dt className="list-title">
        <h3 className="text-neutral-500 dark:text-silver-dark">
          <div className="flex items-center gap-2">
            Aug 2024 <Badge>Present</Badge>
          </div>
        </h3>
      </dt>
        <dd className="list-content">
            <div>Go Engineer</div>
            <div>
                <LinkExternal href="//solidgate.com">Solidgate</LinkExternal>
            </div>

            <div className="pt-1 text-sm text-neutral-500 [font-variation-settings:'opsz'_14] dark:text-silver-dark">
                Kyiv, Ukraine
            </div>
        </dd>
    </dl>
  );
}
